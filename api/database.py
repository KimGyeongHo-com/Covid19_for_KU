from pymongo import MongoClient
import bcrypt
import datetime
import sys

import config
import utils

class Database:
    def __init__(self):
        self.client = MongoClient(host=config.MONGO_API)
        self.mydb = self.client[config.MONGO_DATABASE]
        self.users = self.mydb.users
        self.facilities = self.mydb.facilities
        self.news = self.mydb.news

    def __del__(self):
        self.client.close()

    def register(self, email, password, _type='student'):
        existing_user = self.users.find_one({'email': email})
        if existing_user:
            raise Exception(f"User '{email}' already exists.")
        utils.validate_email(email)
        hashpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.users.insert({'email': email, 'password': hashpass, 'type': _type})

    def login(self, email, password):
        existing_user = self.users.find_one({'email': email})
        if existing_user:
            if bcrypt.hashpw(password.encode('utf-8'), existing_user['password']) == existing_user['password']:
                return True
            else:
                raise Exception(f"Wrong password for email '{email}'.")
        raise Exception(f"Email '{email}' not registered.")

    def get_user_schedule(self, email):
        res = []
        to_datetime = lambda _str : datetime.datetime.strptime(_str, config.DATE_FORMAT)
        actual_time = datetime.datetime.utcnow()
        for facility in self.facilities.find({}, {'_id': 0}):
            for booked in facility['booked']:
                if email in booked['by'] and to_datetime(booked['to']) >= actual_time:
                    res.append({'name': facility['name'],
                                'description': facility['description'],
                                **booked
                    })
        return res

    def get_facilities(self):
        return list(self.facilities.find({}, {'_id': 0, 'name': 1}))

    def get_facility_info(self, facility_name):
        facility = self.facilities.find_one({'name': facility_name}, {'_id': 0})
        if not facility:
            raise Exception(f"Could not find facility {facility_name}")
        to_datetime_time = lambda _str : datetime.datetime.strptime(_str, config.TIME_FORMAT).time()
        to_datetime = lambda _str : datetime.datetime.strptime(_str, config.DATE_FORMAT)

        facility['booked']  = [booked for booked in facility['booked'] if to_datetime(booked['to']) >= datetime.datetime.utcnow()]

        is_inside_time = lambda slot : to_datetime_time(slot['_from']) <= datetime.datetime.utcnow().time() <= to_datetime_time(slot['to'])
        is_inside = lambda slot : to_datetime(slot['_from']) <= datetime.datetime.utcnow() <= to_datetime(slot['to'])
        opened = any(is_inside_time(open_times) for open_times in facility['open_times'])
        maintenance = any(is_inside(closed) for closed in facility['closed'])

        facility['status'] = 'Maintenance' if maintenance else 'Opened' if opened else 'Closed'
        return facility

    def set_facility_status(self, email, name, closed):
        existing_user = self.users.find_one({'email': email})
        if not existing_user:
            raise Exception("Could not find user.")
        if existing_user['type'] != 'staff':
            raise Exception("Only staff members can change the facility status.")

        facility = self.facilities.find_one({'name': name})
        if not facility:
            raise Exception(f"Facility '{name}' already exists.")
        myquery = {'name': name}
        newvalues = {'$set': {'closed': closed}}
        self.facilities.update_one(myquery, newvalues)

    def add_facility_impl(self, name, description, open_times, image, bookable):
        facility = self.facilities.find_one({'name': name})
        if facility:
            raise Exception(f"Facility '{name}' already exists")
        self.facilities.insert({'name': name,
                                'description': description,
                                'image': image,
                                'bookable': bookable,
                                'open_times': open_times,##{"_from": "10:00", "to": "11:00"}
                                'booked': [],##{"_from": "10:00", "to": "11:00", by: ["user_id"]}
                                'closed': []##{"_from": "10:00", "to": "11:00", "reason": "hollidays"}
        })

    def add_facility(self, email, name, description, open_times, image, bookable, *args, **kwargs):
        existing_user = self.users.find_one({'email': email})
        if not existing_user:
            raise Exception("Could not find user.")
        if existing_user['type'] != 'staff':
            raise Exception("Only staff members can add news.")

        self.add_facility_impl(name, description, open_times, image, bookable)

    def book_facility(self, email, name, _from, to, **args):
        to_datetime = lambda _str : datetime.datetime.strptime(_str, config.DATE_FORMAT)

        if to_datetime(_from) >= to_datetime(to):
            raise Exception(f"{to} is before {_from}.")
        if to_datetime(to) <= datetime.datetime.utcnow():
            raise Exception("Cannot book a facility in the past.")

        facility = self.facilities.find_one({'name': name})
        if not facility:
            raise Exception(f"Facility '{name}' does not exist.")

        if not facility['bookable']:
            raise Exception(f"Facility '{name}' cannot be booked.")

        is_inside = lambda slot, a : to_datetime(slot['_from']) <= to_datetime(a) <= to_datetime(slot['to'])

        for slot in facility['booked']:
            if is_inside(slot, _from) or is_inside(slot, to):
                raise Exception("Already booked.")

        facility['booked'].append({'_from': _from, 'to': to, 'by': [email]})##user_id instead of email!!

        myquery = {'name': name}
        newvalues = {'$set': {'booked': facility['booked']}}
        self.facilities.update_one(myquery, newvalues)

    def add_news_impl(self, title, description, date=None):
        existing_news = self.news.find_one({'title': title})
        if existing_news:
            raise Exception(f"News '{title}' already exists.")
        if date is None:
            date = datetime.datetime.utcnow().strftime(config.DATE_FORMAT)
        self.news.insert({'title': title,
                          'description': description,
                          'date_created': date
        })

    def add_news(self, email, title, description, *args, **kwargs):
        existing_user = self.users.find_one({'email': email})
        if not existing_user:
            raise Exception("Could not find user.")
        if existing_user['type'] != 'staff':
            raise Exception("Only staff members can add news.")
        self.add_news_impl(title, description)

    def del_news(self, email, title):
        existing_user = self.users.find_one({'email': email})
        if not existing_user:
            raise Exception("Could not find user.")
        if existing_user['type'] != 'staff':
            raise Exception("Only staff members can delete news.")
        existing_news = self.news.find_one({'title': title})
        if not existing_news:
            raise Exception(f"News '{title}' doesn't exists.")
        self.news.remove({'title': title})

    def get_news(self):
        return list(self.news.find({}, {'_id': 0}))
