"use client";
import Image, { StaticImageData } from "next/image";
import fruits from "./fruits.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
type fruitsProps = {
  fruits: StaticImageData;
};
export default function Home({ ...props }: fruitsProps) {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState<string | undefined>(
    undefined
  );
  const [userName, setUserName] = useState("");
  const [responseName, setResponseName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [handOption, setHandOption] = useState<"right" | "left">("right");

  async function onSearch() {
    try {
      const response = await getAPIData(inputValue);

      setResponseData(response);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("unknown error");
      }
    }
  }

  async function onName() {
    try {
      const response = await getInputData(userName, userAge, handOption);
      setResponseName(response);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("unknown error");
      }
    }
  }

  return (
    <main className="bg-white  flex flex-col items-center h-screen gap-4">
      <Image
        className="flex items-center mt-10 "
        src={fruits}
        alt="fruit_logo"
        height={300}
        width={400}
      />
      {/* <p className="text-black">My Input value :{inputValue}</p> */}
      <div className="flex gap-4">
        <input
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="border border-1 p-2 pl-4 text-black rounded-full w-96"
          type="text"
          placeholder="enter fruit name"
        ></input>
        <button
          className="border border-1 rounded-full text-purple-500 bg-yellow-300 p-2 w-24"
          onClick={() => onSearch()}
        >
          Search
        </button>
      </div>
      <p className="text-black">
        API response: <code> {responseData}</code>{" "}
      </p>
      <div className="flex gap-2">
        <input
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          type="text"
          placeholder="enter your name"
          className="border border-1 p-4 pl-2 rounded-full text-black"
        ></input>
      </div>

      <div className="flex gap-4">
        <input
          value={userAge}
          onChange={(event) => {
            setUserAge(event.target.value);
          }}
          type="number"
          placeholder="age"
          className="text-black border border-1  pl-2"
        ></input>
      </div>
      <p className="text-black">handedness:</p>
      <div className="flex gap-10">
        <div>
          <input
            onChange={() => setHandOption("left")}
            type="radio"
            checked={handOption === "left"}
          ></input>
          <p className="text-black">left</p>
        </div>
        <div>
          <input
            onChange={() => setHandOption("right")}
            type="radio"
            checked={handOption === "right"}
          ></input>
          <p className="text-black">right</p>
        </div>
      </div>
      <button
        className="border border-1 rounded-full text-purple-500 bg-yellow-300 p-2 w-24"
        onClick={() => onName()}
      >
        Click
      </button>
      <p className="text-black">
        <code>{responseName}</code>
      </p>
    </main>
  );
}

async function getAPIData(inputValue: string) {
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:3000/api/hello/${inputValue}`,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("unknown error");
    }
    return null;
  }
}

async function getInputData(
  userName: string,
  userAge: string,
  handOption: string
) {
  console.log(handOption);
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:3000/api/hello/${userName}?age=${userAge}&hand=${handOption}`,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("unknown error");
    }
    return null;
  }
}
