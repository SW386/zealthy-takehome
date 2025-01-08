from sqlalchemy import Column, String, Integer, Enum, Boolean, DateTime, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class User(Base):

    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)
    birthday = Column(DateTime)
    about = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zipcode = Column(Integer)

    def to_json(self):
        return {
            'id': self.id, 
            'email': self.email,
            'password': self.password, 
            'birthday': self.birthday, 
            'about': self.about, 
            'address': self.address, 
            'city': self.city, 
            'state': self.state, 
            'zipcode': self.zipcode, 
        }

class AdminSettings(Base):
    
    __tablename__ = 'admin'
    id = Column(Integer, primary_key=True)
    setting = Column(String)
    page = Column(Integer)

engine = create_engine('sqlite:///instance/signup.db')
Base.metadata.create_all(engine, checkfirst=True)
Session = sessionmaker(bind=engine)
session = Session()

# If the default settings have not been created, add them now
if not session.query(AdminSettings).first():
    about = AdminSettings(id=1, setting='about', page=2)
    address = AdminSettings(id=2, setting='address', page=3)
    birthday = AdminSettings(id=3, setting='birthday', page=3)
    session.add_all([about, address, birthday])
    session.commit()

session.close()


