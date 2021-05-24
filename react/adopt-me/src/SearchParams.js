import { useState, useEffect } from 'react';
import Pet from './Pet';
import useBreedList from './useBreedList';

const ANIMAlS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [animal, updateAnimal] = useState("");
    const [location, updateLocation] = useState("");
    const [breed, updateBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);

    // function updateLocation(e) {
        // setLocation(e.target.value);
    // }

    useEffect(() => {
        requestPets();
    }, []); // eslint-disable-line react-hooks/exhautive-deps

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();

        // console.log(json);
        setPets(json.pets);
    }
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
            {pets.map((pet) => (
                <Pet 
                    name={pet.name}
                    animal={pet.animal}
                    breed={pet.breed}
                    key={pet.id}
                />
            ))}
        </div>
    );
};

export default SearchParams;
 