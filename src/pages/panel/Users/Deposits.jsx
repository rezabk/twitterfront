import React, { useState, useEffect } from "react";
import {
  showDeposits,
  confirmDeposit,
  deleteDeposit,
} from "../../../api/AdminServices";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
export default function Deposits() {
  const [deposits, setDeposits] = useState();
  const [reversedDeposits, setReversedDeposits] = useState();

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

      if (status === 200) {
        const reversedData = data.result.slice().reverse();
        setReversedDeposits(reversedData);
        setDeposits(reversedData);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  const handleVerifyButton = async (depositId) => {
    const id = { id: depositId };
    try {
      const { status, data } = await confirmDeposit(id);

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

  const handleDeleteButton = async (depositId) => {
    const id = { depositId };
    try {
      const { status, data } = await deleteDeposit(id);

      if (status === 200) {
        toast.success("Deposit request deleted");
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
                          <button
                            style={{ cursor: "default" }}
                            type="button"
                            class="btn btn-success"
                          >
                            successful
                          </button>
                        ) : (
                          <button
                            style={{ cursor: "default" }}
                            type="button"
                            class="btn btn-warning"
                          >
                            Pending
                          </button>
                        )
                      ) : null}{" "}
                    </td>
                    <td>
                      {" "}
                      {deposit.status == true ? (
                        <button
                          style={{ cursor: "default" }}
                          type="button"
                          class="btn btn-secondary"
                        >
                          Verified
                        </button>
                      ) : (
                        <>
                          <button
                            key={deposit.id}
                            onClick={(e) => handleVerifyButton(deposit.id)}
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
                      <button
                        key={deposit.id}
                        onClick={(e) => handleDeleteButton(deposit.id)}
                        type="button"
                        class="btn btn-danger"
                      >
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
