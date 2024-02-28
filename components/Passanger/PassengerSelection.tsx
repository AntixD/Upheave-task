"use client";

import { useState } from "react";

function PassengerSelection() {
  const [people, setPeople] = useState([
    { id: 1, name: "Passenger 1" },
    { id: 2, name: "Passenger 2" },
  ]);
  const [selectedPersonId, setSelectedPersonId] = useState(people[0].id);

  return (
    <div className="flex gap-4 items-center">
      {people.map((person) => (
        <button
          key={person.id}
          onClick={() => setSelectedPersonId(person.id)}
          className={`py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400
                ${
                  selectedPersonId === person.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
        >
          {person.name}
        </button>
      ))}
    </div>
  );
}

export default PassengerSelection;
