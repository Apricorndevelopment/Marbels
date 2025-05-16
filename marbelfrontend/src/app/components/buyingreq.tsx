interface Request {
  req: {
    name: string;
    product: string | null;
    message: string | null;
  };
}

export function Req({ req }: Request) {
  return (
    <div className="m-4 py-6 px-5 text-black bg-white rounded-lg shadow-lg border border-gray-200 hover:border-blue-600 transition duration-200">
      <div className="flex gap-8 items-center">
        <h1 className="text-lg font-bold text-gray-700">{req.name}</h1>
        <h2 className="text-md font-semibold text-gray-600">
          Enquiry about{" "}
          <span className="text-yellow-500 font-bold">
            {req.product || "No product specified"}
          </span>
        </h2>
      </div>
      <div className="mt-4 text-gray-800">
        <span className="font-semibold">Message: </span>
        <span>{req.message || "No message provided"}</span>
      </div>
      {/* <div className="flex flex-wrap justify-between items-center mt-4 pt-2 border-t-[1px] border-dotted border-gray-300">
        <button className="mt-3 bg-yellow-400 text-black py-2 px-6 rounded-md hover:bg-yellow-500 transition duration-200 ease-in-out">
          Respond Now
        </button>
      </div> */}
    </div>
  );
}
