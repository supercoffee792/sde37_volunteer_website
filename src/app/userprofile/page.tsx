"use client";
import Usernavbar from "../components/Usernavbar";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bearImage from '../images/bear.png';
import birdImage from '../images/bird.png';
import chameleonImage from '../images/chameleon.png';
import frogImage from '../images/frog.png';
import raccoonImage from '../images/raccoon.png';
import turtleImage from '../images/turtle.png';



const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const images = [
{ label: 'bear', value: 'bear', src: bearImage.src },
{ label: 'bird', value: 'bird', src: birdImage.src },
{ label: 'chameleon', value: 'chameleon', src: chameleonImage.src },
{ label: 'frog', value: 'frog', src: frogImage.src },
{ label: 'raccoon', value: 'raccoon', src: raccoonImage.src },
{ label: 'turtle', value: 'turtle', src: turtleImage.src }
];

const availableSkills = [
    "Problem solving",
    "Good with pets",
    "Good with kids",
    "Programming",
    "Leadership",
    "Writing",
    "CPR certified",
    "Carpentry",
    "Cooking",
    "Multilingual",
    "Creative arts",
];

const ageRanges = [
    "Under 15",
    "15-17",
    "18-20",
    "21-30",
    "31-40",
    "41-50",
    "51-60",
    "61+"
]

interface VolunteerData { // data types expected when creating event object
    id: number;
    pfp: string;
    username: string;
    gender: string;
    age: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    
};

const initialState = {
    bio: {
      gender: '',
      age: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
    },
    skills: [],
    preferences: '',
    availability: {
      selectedDay: '',
      startTime: '',
      endTime: '',
    },
  };

export default function Userprofile() {   
    const [volunteers, setVolunteers] = useState<VolunteerData[]>([]); 

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async() => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/volunteers/");
            const data = await response.json();
            setVolunteers(data);
        } 
        catch (err) {
            console.log(err);
        }
    };
    
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [availability, setAvailability] = useState<Record<string, { startTime: string | null; endTime: string | null }>>({});
  
    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const day = e.target.value;
      setSelectedDay(day === "" ? null : day);
      setStartTime(null);
      setEndTime(null);
    };
  
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartTime(e.target.value || null);
    };
  
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndTime(e.target.value || null);
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (selectedDay && startTime && endTime) {
        setAvailability(prev => ({
          ...prev,
          [selectedDay]: { startTime, endTime }
        }));
        // Reset the form
        setSelectedDay(null);
        setStartTime(null);
        setEndTime(null);
      }
    };


    {/* Picture and Name */}
    const [profileData, setProfile] = useState({
        username: 'John Doe',
        pfp: bearImage.src
    });
    const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
    const [newName, setNewName] = useState(profileData.username);
    const [selectedImage, setSelectedImage] = useState(profileData.pfp)

    const handleImageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const newImage = images.find(img => img.value === selectedValue) || images[0]; // default first image
    
        setSelectedImage(newImage.src);
        setProfile((prevData) => ({
            ...prevData,
            img: newImage.src,
        }));
    };

    const handleInputProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewName(value)
    };

    const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProfile(prevData => ({
            ...prevData,
            username: newName,
            img: selectedImage,
        }));
    
        setIsEditingProfile(false); 
    };

    {/* Bio */}

    const [bioData, setBio] = useState({
        gender: 'Male',
        age: "21-30",
        address1: '123 Main Street',
        address2: '',
        city: 'Huntsville',
        state: 'AL',
        zipcode: '12345'

    });
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [newBio, setNewBio] = useState(bioData);


    const handleInputBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBio(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSelectBioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBio(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSaveBio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBio(newBio);
        setIsEditingBio(false);
    };
  
    {/* Skills */}
    const [isEditingSkills, setIsEditingSkills] = useState<boolean>(false);
    const [skills, setSkills] = useState<string[]>([]);

    const handleSkillsSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = e.target;
        const selectedValues: string[] = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }

        setSkills(selectedValues);
    };
    const handleSaveSkills = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSkills([...skills])
        setIsEditingSkills(false); // Exit editing mode
    };

    {/* Preferences */}
    const [isEditingPreferences, setIsEditingPreferences] = useState<boolean>(false);
    const [preferencesData, setPreferencesData] = useState<string>("");
    const [newPreferences, setNewPreferences] = useState<string>(preferencesData);

    const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPreferences(e.target.value); // Update newPreferences with input value
    };
    const handleSavePreferences = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form submission default behavior
        setPreferencesData(newPreferences); // Save the new preferences
        setIsEditingPreferences(false); // Exit editing mode
    };
    

    return (
        <div className="bg-slate-800 h-screen overflow-x-hidden">
            <Usernavbar />

            <div className="flex flex-col">
                {/* Notifications Picture, Name, Bio */}
                <div className="flex flex-grow  pt-8 pr-8 pl-8  ">
                    {/* Picture, Name, Bio */}
                    <div className="flex-grow w-3/4 pr-8">

                        {/* Picture and Name */}
                        <form onSubmit={handleSaveProfile}>
                            <div className="flex items-center mb-8">
                                {isEditingProfile ? (
                                    <select onChange = {handleImageSelect} value={images.find(img => img.src === selectedImage)?.value || ''}
                                    className = "w-24 h-24 rounded-md mr-6 border-2 border-gray-300">
                                        {images.map((img) => (
                                            <option key={img.value} value={img.value}>{img.label}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="overflow-hidden w-24 h-24 rounded-md mr-6 border-2 border-gray-300">
                                        <img src={profileData.pfp} alt="ProfileImg" className="w-full h-full object-cover"/>
                                    </div>
                                )}

                                <div className = "container display-inline">
                                    <div>
                                    {isEditingProfile ? (
                                        <input
                                        type="text"
                                        className="m-2 text-4xl text-white font-bold border-none bg-transparent"
                                        maxLength={50}
                                        required
                                        value={newName}
                                        onChange = {handleInputProfileChange}
                                        />
                                    ) : (
                                        <p className="m-2 text-4xl text-white font-bold border-black bg-transparent">{profileData.username}</p>
                                    )}
                                    </div>
                                    {isEditingProfile ? (
                                        <>
                                            <button type="submit" className="m-2 bg-slate-300 text-black py-2 px-4 rounded">Save</button>
                                            <button type="button" className="bg-red-300 text-black py-2 px-4 rounded"
                                            onClick={() => setIsEditingProfile(false)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button type="button" className="m-2 bg-slate-300 text-black py-2 px-4 rounded"
                                        onClick={() => {
                                            setNewName(profileData.username)
                                            setIsEditingProfile(true)}}>Edit</button>
                                    )}
                                </div>
                            </div>
                        </form>

                        {/* Bio */}
                        <div className="mb-4">
                            <h2 className="text-2xl text-white font-semibold mb-4">Bio</h2>
                            <form className="bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={handleSaveBio}>
    
                                {/* Top row of bio */}
                                <div className="flex space-x-4">

                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                        {isEditingBio ? (
                                        <select name="gender" className="w-full p-2 border border-gray-300 rounded bg-gray-100" onChange={handleSelectBioChange} value={newBio.gender} required>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Non-Binary/Other</option>
                                        </select>
                                        ):(
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{bioData.gender}</p>
                                        )}
                                    </div>

                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                                        {isEditingBio ? (
                                            <select name="age" className="w-full p-2 border border-gray-300 rounded bg-gray-100" onChange={handleSelectBioChange} value={newBio.age} required>
                                                {ageRanges.map((age) => (
                                                    <option key={age} value={age}>{age}
                                                    </option>
                                                ))}
                                            </select>
                                        ):(
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{bioData.age}</p>
                                        )}
                                    </div>
                                    
                                    {isEditingBio ? (
                                        <>
                                            <button type="submit" className="bg-slate-300 text-black py-2 px-4 rounded">Save</button>
                                            <button type="button" className="bg-red-300 text-black py-2 px-4 rounded"
                                            onClick={() => setIsEditingBio(false)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button type="button" className="bg-slate-300 text-black py-2 px-4 rounded"
                                        onClick={() => setIsEditingBio(true)} >Edit</button>
                                    )}

                                </div>

                                {/* Bottom row of bio */}
                                <div className="grid grid-cols-6 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                            {isEditingBio ? (
                                                <input type="text" name="address1" value={newBio.address1} onChange={handleInputBioChange} className="w-full p-2 border border-gray-300 rounded bg-gray-100" maxLength={100} required/>
                                            ) : (
                                                <p className="h-10 w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-hidden">{bioData.address1}</p>
                                            )}
                                    </div>
                                    <div className="col-span-1 overflow-x-hidden">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 " >Apt/Unit/Suite</label>
                                        {isEditingBio ? (
                                            <input type="text" name="address2" className="w-full p-2 border border-gray-300 rounded bg-gray-100" value={newBio.address2} onChange={handleInputBioChange} maxLength={100} />
                                        ) : (
                                            <p className="w-full min-h-10 p-2 border border-gray-300 rounded bg-gray-100">{bioData.address2}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                        {isEditingBio ? (
                                            <input type="text" name="city" className="w-full p-2 border border-gray-300 rounded bg-gray-100" maxLength={100} value={newBio.city} onChange={handleInputBioChange} required/>
                                        ) : (
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-x-hidden">{bioData.city}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"> State </label>
                                        {isEditingBio ? (
                                            <select name="state" className="w-full p-2 border border-gray-300 rounded bg-gray-100" onChange={handleSelectBioChange} value={newBio.state} required >
                                                {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-x-hidden">{bioData.state}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 overflow-x-hidden">Zip</label>
                                        {isEditingBio ? (
                                            <input type="text" name="zip" className="w-full p-2 border border-gray-300 rounded bg-gray-100" value={newBio.zipcode}onChange={handleInputBioChange} maxLength={9} minLength={5} inputMode={"numeric"} pattern={"[0-9]*"} required/>
                                        ) : (
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-x-hidden">{bioData.zipcode}</p>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="w-1/4 bg-white p-8 rounded-lg shadow-md flex flex-col max-h-96">
                        <h2 className="text-2xl font-semibold overflow-y-hidden pb-6">Notifications</h2>
                        <div className="flex-grow flex-col space-y-4 overflow-y-auto">
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills, Preferences, Events */}
            <div className="flex flex-col">
                <div className="flex flex-col h-full">
                    <div className="flex-grow pt-2 pl-8 pr-8 pb-8">
                        {/* Skills*/}
                        <div className="mb-4 flex-col">
                            <h2 className="text-2xl text-white font-semibold mb-4">Skills</h2>
                            <div className=" w-full bg-white p-6 rounded-lg shadow-md flex inline-flex flex-wrap gap-2">
                                <form className = 'w-full' onSubmit={handleSaveSkills}>
                                    {isEditingSkills ? (
                                        <>
                                            <select multiple className="w-full  text-black rounded-md p-1" value={skills} onChange={handleSkillsSelectChange}>
                                                {availableSkills.map((skill) => (
                                                    <option key={skill} value={skill}>
                                                        {skill}
                                                    </option>
                                                ))}
                                            </select>
                                            <button type="submit" className="w-full bg-slate-300 text-black py-2 px-4 rounded">Save Skills</button>
                                        </>
                                        ) : (
                                        <>
                                            <button type="button" className="w-full bg-slate-300 text-black py-2 px-4 rounded" 
                                            onClick={() => setIsEditingSkills(true)}>Edit</button>
                                            <div className="m-4 flex inline-flex flex-wrap gap-2 ">
                                                {skills.map((skill) => (
                                                    <p key={skill} className={"py-2 px-4 rounded-full bg-slate-600 text-slate-300"}>
                                                        {skill}
                                                    </p>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="mb-4 flex-col min-h-50">
                            <h2 className="text-2xl text-white font-semibold mb-4">Preferences</h2>
                            <div className = " w-full bg-white p-6 rounded-lg shadow-md flex inline-flex flex-wrap gap-2">
                            <form onSubmit={handleSavePreferences} className="w-full display-grid">
                                {isEditingPreferences ? (
                                    <div className = "w-full">
                                        <input
                                            type="text"
                                            className="w-full p-2 m-2 text-black border border-gray"
                                            value={newPreferences} // Bind the input to newPreferences
                                            onChange={handlePreferencesChange} // Handle input change
                                            placeholder="Enter your preferences"
                                        />
                                        <div className = "w-full display-block">
                                            <button type="submit" className="w-full bg-slate-300 p-2 m-2 rounded mr-2">Submit</button>
                                            <button type="button" className="w-full bg-red-300 p-2 m-2 rounded" onClick={() => setIsEditingPreferences(false)}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="p-2 m-2 w-full text-black border border-gray bg-transparent">{preferencesData}</p>
                                        <button type="button" className="p-2 m-2 w-full bg-slate-300 text-black py-2 px-4 rounded" 
                                        onClick={() => {
                                            setIsEditingPreferences(true);
                                        }}>
                                        Edit</button>
                                    </div>
                                )}
                            </form>
                            </div>
                        </div>

                        {/* Event History*/}
                        <div className="mb-4 flex-col">
                            <h2 className="text-2xl text-white font-semibold mb-4">Event History</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md flex overflow-x-auto space-x-4">
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                            </div>
                        </div>
                        {/* Availability Section */}
                        <div className="mb-4 flex-col">
              <h2 className="text-2xl text-white font-semibold mb-4">Availability</h2>
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <label>
                  Choose a day:
                  <select value={selectedDay || ""} onChange={handleDayChange} className="w-full p-2 border border-gray-300 rounded bg-gray-100">
                    <option value="">Select a day</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </label>

                {selectedDay && (
                  <div>
                    <label className="block mt-4">
                      Start Time:
                      <input
                        type="time"
                        value={startTime || ""}
                        onChange={handleStartTimeChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </label>
                    <label className="block mt-4">
                      End Time:
                      <input
                        type="time"
                        value={endTime || ""}
                        onChange={handleEndTimeChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </label>
                  </div>
                )}

                <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                  Set Availability
                </button>
              </form>

              <h3 className="mt-6 text-lg font-semibold">Current Availability:</h3>
              <ul>
                {Object.entries(availability).map(([day, times]) => (
                  <li key={day} className="mt-1 text-white">
                    {day}: {times.startTime} - {times.endTime}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
    </div>

</div>


);

}
