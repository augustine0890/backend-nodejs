import { useState } from 'react';

const ANIMAlS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [animal, updateAnimal] = useState("");
    const [location, updateLocation] = useState("");
    const [breed, updateBreed] = useState("");
    const breeds = [];

    // function updateLocation(e) {
        // setLocation(e.target.value);
    // }

    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input 
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={e => updateLocation(e.target.value)}
                        // onChange={updateLocation(e.target.value)}
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select 
                        id="animal" 
                        value={animal}
                        onChange={e => updateAnimal(e.target.value)}
                        onBlur={e => updateAnimal(e.target.value)}
                    >
                        <option />
                        {ANIMAlS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        value={breed}
                        onChange={e => updateBreed(e.target.value)}
                        onBlur={e => updateBreed(e.target.value)}
                    >
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default SearchParams;
 