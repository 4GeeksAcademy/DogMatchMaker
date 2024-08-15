import click
from api.models import db, UserAccount
import random
import math
import requests
import json

def fetch_breeds():
    try:
        response = requests.get('https://dog.ceo/api/breeds/list/all')
        data = response.json()
        breed_list = []

        for breed, subbreeds in data['message'].items():
            if subbreeds:
                breed_list.extend([f"{breed} {sub_breed}" for sub_breed in subbreeds])
            else:
                breed_list.append(breed)

        return breed_list
    except Exception as error:
        print('Error fetching breeds:', error)
        return []
breed_list = fetch_breeds()


def setup_commands(app):
    """ 
    Add CLI commands here
    """
    @app.cli.command("insert-test-users")
    @click.argument("count")
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = UserAccount()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"  # Remember to hash passwords in production
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")
        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        # Implement test data insertion logic here
        print("Inserting test data...")
        

def setup_user_data(app):
    @app.cli.command("insert-user-data")
    @click.argument("count")
    def insert_user_data(num):
        print("Creating user data")
        dogNames = [["Max", "Male"], ["Bella", "Female"], ["Charlie", "Male"], ["Luna", "Female"], 
                    ["Rocky", "Male"], ["Molly", "Female"], ["Duke", "Male"], ["Sadie", "Female"],
                    ["Cooper", "Male"], ["Lucy", "Female"]]
       
        owner_names = ['Emily', 'Sarah', 'James', 'Jessica', 'John', 'Michael', 'David', 'Sophia', 
                       'Olivia', 'Daniel']
       
        traits = ['Independent', 'Stubborn', 'Protective', 'Patient', 'Playful', 'Adaptable', 
                  'Sensitive', 'Loving', 'Shy', 'Confident', 'Clingy', 'Friendly', 'Courageous', 
                  'Social', 'Alert', 'Energetic', 'Fearless', 'Affectionate', 'Loyal', 'Cheerful', 
                  'Intelligent', 'Sociable', 'Calm', 'Resourceful', 'Watchful', 'Curious', 'Active', 
                  'Obedient', 'Gentle', 'Brave']
        
        cities = ['West Palm Beach', 'Doral', 'Fort Lauderdale', 'Delray Beach', 'Coral Springs', 
                  'Pembroke Pines', 'Boca Raton', 'Miami', 'Hollywood', 'Hialeah']

        for x in range(1,11):
            owner_name = random.choice(owner_names)
            user = UserAccount()
            user.owner_name = owner_name
            user.email = "test_user" + str(x + 1) + "@test.com"
            user.password = "1234"
            randog = random.choice(dogNames)
            user.dog_name = randog[0]
            user.dog_age = random.randint(1, 12)
            user.dog_sex = randog[1]
            user.breed = random.choice(breed_list)
            user.traits = random.sample(traits, 4)
            user.location = random.choice(cities)
            user.bio = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            
            db.session.add(user)
        db.session.commit()
        # Insert data
        print(f"{num} user data created.")

            
            