import React from "react";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";

function apiHandler(params) {
  return (
    <>
      <Get url={params.path}>
        {(error, response, makeRequest) => {
          if (error) {
            return (
              <div className="danger alert">
                Something bad happened: {error.message}{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => makeRequest({ params: { reload: true } })}
                >
                  Retry
                </button>
              </div>
            );
          } else if (response !== null) {
            console.log(response);
            return <params.component response={response.data}></params.component>;
          }
          return (
            <Loader
              className="m-5 p-5"
              type="Bars"
              color="#00eFFF44"
              height={200}
              width={200}
            />
          );
        }}
      </Get>
    </>
  );
}

export default apiHandler;
