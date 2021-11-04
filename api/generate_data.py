import sys
from database import Database

class User(Database):
    def __init__(self, email, password, _type='student'):##student, staff,
        super().__init__()
        try:
            self.register(email, password)
        except Exception as e:
            print(e, file=sys.stderr)

class Facility(Database):
    def __init__(self,
                 name,
                 open_times,
                 description='Short description',
                 image='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
                 bookable=True):
        super().__init__()
        try:
            self.add_facility_impl(name, description, open_times, image, bookable)
        except Exception as e:
            print(e, file=sys.stderr)

class News(Database):
    def __init__(self, title, description, date=None):
        super().__init__()
        try:
            self.add_news_impl(title, description, date)
        except Exception as e:
            print(e, file=sys.stderr)

def generate_data():
    User('normal.user@test.test', 'abcd')
    User('staff@test.test', 'abcd', 'staff')

    Facility(name='Cafeteria',
             description='This is the description of the cafeteria',
             open_times=[{"_from": "03:00", "to": "05:30"}],
             bookable=False
    )

    Facility(name='Futurus study room 3100',
             description='Study room 3100 of the futurus building situated at the 1st floor. Capacity of 5 people. Furniture: 2 PC.',
             image="https://mlfl0eebtpgt.i.optimole.com/2mK1l6Q.7Lbi~5ba50/w:930/h:621/q:90/https://www.seoulinspired.com/wp-content/uploads/University-of-Seoul-Class.jpg",
             open_times=[{"_from": "03:00", "to": "05:30"}],
             bookable=True
    )
    Facility(name='Futurus study room 3200',
             description='Study room 3200 of the futurus building situated at the 2nd floor. Capacity of 3 people. Furniture: 1 PC.',
             open_times=[{"_from": "03:00", "to": "05:30"}],
             bookable=True
    )
    Facility(name='Futurus study room 3300',
             description='Study room 3300 of the futurus building situated at the 3rd floor. Capacity of 10 people. Furniture: 5 PC.',
             open_times=[{"_from": "03:00", "to": "05:30"}],
             bookable=True
    )

    Facility(name='Futurus eating room',
             description='Eating room of the futurus building siduated in the basement. Capacity 20 people. Furniture: 2 microwaves.',
             open_times=[{"_from": "03:00", "to": "05:30"}],
             bookable=False
    )

    News("COVID-19 Announcement", "The social distancing level in the greater Seoul area will be placed under level 2.5, the second highest in the country's five-tier COVID-19 alert system starting from today for the next three weeks, with other parts of the nation including Sejong City under level 2.")
    News("Daily COVID-19 Cases", "+677 new cases, actual level: level 2.5.", "2020-12-09 09:00")
    News("SkyCoffe", "The Sky Coffe is closing, because the daily new cases increased to much.", "2020-11-20 10:05")
