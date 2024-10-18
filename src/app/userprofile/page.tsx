"use client";
import Usernavbar from "../components/Usernavbar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const images = [ 'bear.png', 'bird.png', 'chameleon.png', 'frog.png', 'raccoon.png', 'turtle.png']
// { label: 'bear', value: 'bear.png', src: bearImage.src },
// { label: 'bird', value: 'bird.png', src: birdImage.src },
// { label: 'chameleon', value: 'chameleon.png', src: chameleonImage.src },
// { label: 'frog', value: 'frog.png', src: frogImage.src },
// { label: 'raccoon', value: 'raccoon.png', src: raccoonImage.src },
// { label: 'turtle', value: 'turtle.png', src: turtleImage.src }
// ];

// const availableSkills = [
//     'Problem solving',
//     'Good with pets',
//     'Good with kids',
//     'Programming',
//     'Leadership',
//     'Writing',
//     'CPR certified',
//     'Carpentry',
//     'Cooking',
//     'Multilingual',
//     'Creative arts',
// ];

const ageRanges = [
    'Under 15',
    '15-17',
    '18-20',
    '21-30',
    '31-40',
    '41-50',
    '51-60',
    '61+'
]

interface VolunteerData { // data types expected when creating event object
    id: number;
    address1: string;
    address2: string;
    age: string;
    city: string;
    date_joined: string;
    email: string;
    first_name: string;
    gender: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string | null;
    last_name: string;
    notififications: string;
    pfp: string;
    preferences: string;
    profilename: string;
    skills: string;
    state: string;
    username: string;
    zipcode: string;
    availability: Record<string, { startTime: string | null; endTime: string | null }>;
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
    // login stuff
    // const [username, setUsername] = useState<string>("");
    const [loginUser, setLoginUser] = useState<VolunteerData | null>(null);
    const [isLogin, setLogin] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        fetchNotifications();
      }, [loginUser?.id]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await fetch('http://127.0.0.1:8000/api/volunteer_info', {
                    headers: {
                        "Authorization":`Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setLoginUser(data);
                    setLogin(true);
                }
                else {
                    setLogin(false);
                    console.log("error logging in");
                }
            }
            catch(err) {
                setLogin(false);
                console.log(err);
            }
        };
        checkLoginStatus()
    }, []);

    const volunteerLogout = async () => {
        try {
            const a_token = localStorage.getItem("access_token");
            const r_token = localStorage.getItem("refresh_token");

            if (r_token && a_token) {
                const response = await fetch('http://127.0.0.1:8000/api/logout/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${a_token}`,
                    },
                    body: JSON.stringify({ refresh: r_token }),
                });

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setLogin(false);
                setLoginUser(null);
                console.log("logged out");
                router.push('/signin');
            }
        }
        catch(err) {
            console.log("Can't logout");
            console.log(err);
        }
    };



    //Initializations
    const [profileData, setProfile] = useState({
        profilename: loginUser ? loginUser.profilename : "Name",
        pfp: loginUser ? loginUser.pfp : "bear.png"
    });
    const [bioData, setBio] = useState({
        gender: loginUser ? loginUser.gender : "Male",
        age: loginUser ? loginUser.age : "21-30",
        address1: loginUser ? loginUser.address1 : "123 Main",
        address2: loginUser ? loginUser.address2 : "",
        city: loginUser ? loginUser.city : "Huntsville",
        state: loginUser ? loginUser.state : 'AL',
        zipcode: loginUser ? loginUser.zipcode : "12345"
    });
    const [skills, setSkills] = useState<string[]>(
        loginUser && typeof loginUser.skills === 'string' ? loginUser.skills.split(',') : []
    );
    const [preferencesData, setPreferencesData] = useState<string>("");
    
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [availability, setAvailability] = useState<Record<string, { startTime: string | null; endTime: string | null }>>({});
    const [notifications, setNotifications] = useState<string[]>([]);
    useEffect(() => {
        if (loginUser) {
            setAvailability(loginUser.availability || {});
        }
    }, [loginUser]);


    {/* Picture and Name */}
    const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
    const [newName, setNewName] = useState(profileData.profilename);
    const [selectedImage, setSelectedImage] = useState(profileData.pfp)

    const handleImageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const newImage = selectedValue || images[0]; // default first image
    
        setSelectedImage(newImage);
        setProfile((prevData) => ({
            ...prevData,
            pfp: newImage,
        }));
    };

    const handleInputProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewName(value)
        setProfile((prevData) => ({
            ...prevData,
            profilename: value,
        }));
    };

    const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("old: ", loginUser)
    
        // Prepare the updated profile data
        const updatedProfile = {
            profilename: newName,
            pfp: selectedImage
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/volunteers/${loginUser ? loginUser.id : 0}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedData = await response.json();
            
            setLoginUser(prevUser => ({
                ...prevUser,
                ...updatedData
            }));
            setProfile(prevData => ({
                ...prevData,
                profilename: updatedData.profilename,
                pfp: updatedData.pfp,
            }));
            
            setIsEditingProfile(false);
            console.log("new: ", loginUser)

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    {/* Bio */}
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

    const handleSaveBio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("old: ", loginUser)
        
        // Prepare the updated bio data
        const updatedBio = newBio; // This will contain the updated bio data
        console.log("updatedBio: ", updatedBio)
    
        try {
            // Make sure you have the user's ID (assuming it's available in `loginUser`)
            const response = await fetch(`http://127.0.0.1:8000/api/volunteers/${loginUser ? loginUser.id : 0}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBio), // Sending the updated bio data
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update bio: ${errorText}`);
            }
    
            const updatedData = await response.json();
            console.log("updated data: ", updatedData);
            
            setLoginUser(updatedData);
            
            setBio(prevData => ({
                ...prevData,
                gender: updatedData.gender,
                age: updatedData.age,
                address1: updatedData.address1,
                address2: updatedData.address2,
                city: updatedData.city,
                state: updatedData.state,
                zipcode: updatedData.zipcode,
            }));
    
            setIsEditingBio(false); // Exit editing mode

            console.log("new: ", loginUser);

        } catch (error) {
            console.error("Error updating bio:", error);
        }
    };

  
    {/* Skills */}
    const [isEditingSkills, setIsEditingSkills] = useState<boolean>(false);

    const handleSkillsSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedSkills = Array.from(e.target.selectedOptions, option => option.value);

        setSkills(selectedSkills);
    };

    const handleSaveSkills = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Prepare the updated skills data
        const updatedSkills = {
            skills: skills.join(',') // Assuming the API expects a comma-separated string
        };
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/volunteers/${loginUser ? loginUser.id : 0}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSkills),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update skills');
            }
    
            const updatedData = await response.json();
            
            setLoginUser(updatedData);
    
            setSkills(updatedData.skills.split(',')); //split back into an array
            
            setIsEditingSkills(false);

    
        } catch (error) {
            console.error("Error updating skills:", error);
        }
    };



    {/* Preferences */}
    const [isEditingPreferences, setIsEditingPreferences] = useState<boolean>(false);
    const [newPreferences, setNewPreferences] = useState<string>(preferencesData);

    const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPreferences(e.target.value); // Update newPreferences with input value
    };

    const handleSavePreferences = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const updatedPreferences = { preferences: newPreferences };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/volunteers/${loginUser ? loginUser.id : 0}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPreferences),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update preferences: ${errorText}`);
            }

            const updatedData = await response.json();
            
            setLoginUser(updatedData);

            setPreferencesData(updatedData);

            setIsEditingPreferences(false);

        } catch (error) {
            console.error("Error updating preferences:", error);
        }
    };

    {/* Availability */}
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedDay && startTime && endTime) {

            const updatedAvailability = {
                ...availability,
                [selectedDay]: { startTime, endTime },
            };

            console.log(updatedAvailability);

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/volunteers/${loginUser ? loginUser.id : 0}`, {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({availability: updatedAvailability }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to update availability: ${errorText}`);
                }
                
                const updatedData = await response.json();

                console.log(updatedData.availability)
                
                setLoginUser(updatedData.availability);

                setAvailability(updatedData.availability);

                // setAvailability(prev => ({
                //     ...prev,
                //     [selectedDay]: { startTime, endTime }
                //     }));

                setSelectedDay(null);
                setStartTime(null);
                setEndTime(null);

            } catch (error) {
                console.error("Error updating availability:", error);
            }
        }
    };

    const fetchNotifications = async () => {
        if (!loginUser?.id) return;
        
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/volunteers/${loginUser.id}/notifications/`);
          const data = await response.json();
          setNotifications(data.notifications || []);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

    // console.log(availability)

    return (
        <div className="bg-slate-800 h-screen overflow-x-hidden">
        { isLogin ? (
            <>
            <Usernavbar onLogout={volunteerLogout}/>

            <div className="flex flex-col">
                {/* Notifications Picture, Name, Bio */}
                <div className="flex flex-grow  pt-8 pr-8 pl-8  ">
                    {/* Picture, Name, Bio */}
                    <div className="flex-grow w-3/4 pr-8">

                        {/* Picture and Name */}
                        <form onSubmit={handleSaveProfile}>
                            <div className="flex items-center mb-8">
                                {isEditingProfile ? (
                                    <select onChange = {handleImageSelect} value={profileData.pfp}
                                    className = "w-24 h-24 rounded-md mr-6 border-2 border-gray-300">
                                        {images.map((img) => (
                                            <option key={img} value={img}>{img}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="overflow-hidden w-24 h-24 rounded-md mr-6 border-2 border-gray-300">
                                        <img src={`/images/${loginUser?.pfp}`} alt="ProfileImg" className="w-full h-full object-cover"/>
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
                                        value={profileData.profilename}
                                        onChange = {handleInputProfileChange}
                                        />
                                    ) : (
                                        <p className="m-2 text-4xl text-white font-bold border-black bg-transparent">{loginUser ? loginUser.profilename : ""}</p>
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
                                            setNewName(profileData.profilename)
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
                                            <option value="Non-Binary/Other">Non-Binary/Other</option>
                                        </select>
                                        ):(
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{loginUser ? loginUser.gender : ""}</p>
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
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100">{loginUser ? loginUser.age : ""}</p>
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
                                                <p className="h-10 w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-hidden">{loginUser ? loginUser.address1 : ""}</p>
                                            )}
                                    </div>
                                    <div className="col-span-1 overflow-x-hidden">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 " >Apt/Unit/Suite</label>
                                        {isEditingBio ? (
                                            <input type="text" name="address2" className="w-full p-2 border border-gray-300 rounded bg-gray-100" value={newBio.address2} onChange={handleInputBioChange} maxLength={100} />
                                        ) : (
                                            <p className="w-full min-h-10 p-2 border border-gray-300 rounded bg-gray-100">{loginUser ? loginUser.address2 : ""}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                        {isEditingBio ? (
                                            <input type="text" name="city" className="w-full p-2 border border-gray-300 rounded bg-gray-100" maxLength={100} value={newBio.city} onChange={handleInputBioChange} required/>
                                        ) : (
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-x-hidden">{loginUser ? loginUser.city : ""}</p>
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
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-x-hidden">{loginUser ? loginUser.state : ""}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 overflow-x-hidden">Zip</label>
                                        {isEditingBio ? (
                                            <input type="text" name="zipcode" className="w-full p-2 border border-gray-300 rounded bg-gray-100" value={newBio.zipcode}onChange={handleInputBioChange} maxLength={9} minLength={5} inputMode={"numeric"} pattern={"[0-9]*"} required/>
                                        ) : (
                                            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100 overflow-x-hidden">{loginUser ? loginUser.zipcode : ""}</p>
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
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <div key={index} className="p-4 bg-gray-100 rounded-lg">
                                        <p className="text-gray-700 overflow-x-hidden">{notification}</p>
                                    </div>
                                ))) : (
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <p className="text-gray-700">No notifications</p>
                                </div>
                            )}
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
                                            <select multiple className="w-full  text-black rounded-md p-1" defaultValue={skills} onChange={handleSkillsSelectChange}>
                                                <option value="Problem solving">Problem solving</option>
                                                <option value="Good with pets">Good with pets</option>
                                                <option value="Good with kids">Good with kids</option>
                                                <option value="Programming">Programming</option>
                                                <option value="Leadership">Leadership</option>
                                                <option value="Writing">Writing</option>
                                                <option value="CPR certified">CPR certified</option>
                                                <option value="Carpentry">Carpentry</option>
                                                <option value="Cooking">Cooking</option>
                                                <option value="Multilingual">Multilingual</option>
                                                <option value="Creative arts">Creative arts</option>
                                            </select>
                                            <button type="submit" className="w-full bg-slate-300 text-black py-2 px-4 rounded">Save Skills</button>
                                        </>
                                        ) : (
                                        <>
                                            <button type="button" className="w-full bg-slate-300 text-black py-2 px-4 rounded" 
                                            onClick={() => setIsEditingSkills(true)}>Edit</button>
                                            <div className="m-4 flex inline-flex flex-wrap gap-2 ">
                                                {loginUser?.skills?.split(',').map((skill) => (
                                                    <p key={skill.trim()} className="py-2 px-4 rounded-full bg-slate-600 text-slate-300">
                                                        {skill.trim()} {/* Trim whitespace around the skill */}
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
                                        <p className="p-2 m-2 w-full text-black border border-gray bg-transparent">{loginUser ? loginUser.preferences : ""}</p>
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
                {loginUser && loginUser.availability ? ( // Check if loginUser and availability exist
                    Object.entries(loginUser.availability).map(([day, times]) => (
                        <li key={day} className="mt-1 text-white">
                            {day}: {times.startTime} - {times.endTime}
                        </li>
                    ))
                ) : (
                    <li className="mt-1 text-white">No availability set.</li> // Fallback if no availability
                )}
            </ul>
            </div>
          </div>

        </div>
    </div>
        </>) : (
            <div className="flex justify-center items-center text-white h-screen font-bold">
               <h1>Register or login to access user profile</h1>
            </div>
            )}
</div>


    );

}
