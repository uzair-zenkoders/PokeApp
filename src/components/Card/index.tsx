import { useRouter } from "next/router";
import React from "react";

const Card = ({ id, title }: { id: string; title: string }) => {
  // const { id, title } = props;
  const router = useRouter();
  // const capitalizedTitle = capitalizeFirstLetter(title);

  const onClick = () => {
    router.push(`/pokemon/${id}/`);
  };

  return (
    <div className="max-w-sm text-center bg-yellow-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="https://cdn.icon-icons.com/icons2/851/PNG/512/Ultra_Ball_icon-icons.com_67500.png"
          alt=""
        />
      </a>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Pokemon Title : <span className="text-gray-500">{title}</span>
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {`Click the button below to view Pokemon's details`}
        </p>
        <div className="text-center mt-5">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600  hover:bg-white hover:text-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-full"
            onClick={onClick}
          >
            View Details
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
