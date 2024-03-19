import React, { useState, useEffect } from "react";
import { showDeposits, confirmDeposit } from "../../../api/AdminServices";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
export default function Deposits() {
  const [deposits, setDeposits] = useState();

  function calculateMinutesPassed(datetimeString) {
    const givenDatetime = new Date(datetimeString);

    const currentDatetime = new Date();

    const differenceInMilliseconds = currentDatetime - givenDatetime;

    const minutesPassed = Math.floor(differenceInMilliseconds / (1000 * 60));

    return minutesPassed;
  }

  useEffect(() => {
    handleGetDeposits();
  }, []);

  const handleGetDeposits = async () => {
    try {
      const { status, data } = await showDeposits();
      console.log(data);
      if (status === 200) {
        setDeposits(data.result);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  const handleVerifyButton = async () => {
    try {
      const { status, data } = await confirmDeposit();
      console.log(data);
      if (status === 200) {
        toast.success("Verified Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">Deposits</h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col"> Email</th>
              <th scope="col"> Deposit Amount </th>

              <th scope="col">DateTime </th>

              <th scope="col"> Status </th>
              <th scope="col"> Verify</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(deposits)
              ? deposits.map((deposit) => (
                  <tr>
                    <td>{!isEmpty(deposit) ? deposit.email : null} </td>
                    <td>{!isEmpty(deposit) ? deposit.depositAmount : null} </td>
                    <td>
                      {`${calculateMinutesPassed(
                        deposit.requestTime
                      )} Minutes ago`}
                    </td>
                    <td>
                      {!isEmpty(deposit) ? (
                        deposit.status ? (
                          <button type="button" class="btn btn-success">
                            successful
                          </button>
                        ) : (
                          <button type="button" class="btn btn-warning">
                            Pending
                          </button>
                        )
                      ) : null}{" "}
                    </td>
                    <td>
                      {" "}
                      {deposit.status == true ? (
                        <button type="button" class="btn btn-secondary">
                          Verified
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={(e) => handleVerifyButton(e)}
                            type="button"
                            class="btn btn-primary"
                          >
                            Verify
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      {" "}
                      <button type="button" class="btn btn-danger">
                        Delete
                      </button>{" "}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
