import React, { useState, useEffect } from "react";
import {
  showWithdraws,
  confirmWithdraw,
  deleteWithdraw,
} from "../../../api/AdminServices";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
export default function Withdraws() {
  const [withdraws, setWithdraws] = useState();
  const [reversedWithdraws, setReversedWithdraws] = useState();

  function calculateMinutesPassed(datetimeString) {
    const givenDatetime = new Date(datetimeString);

    const currentDatetime = new Date();

    const differenceInMilliseconds = currentDatetime - givenDatetime;

    const minutesPassed = Math.floor(differenceInMilliseconds / (1000 * 60));

    return minutesPassed;
  }

  useEffect(() => {
    handleGetWithdraws();
  }, []);

  const handleGetWithdraws = async () => {
    try {
      const { status, data } = await showWithdraws();

      if (status === 200) {
        const reversedData = data.result.slice().reverse();
        setReversedWithdraws(reversedData);
        setWithdraws(reversedData);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  const handleVerifyWithdraw = async (withdrawId) => {
    const withdrawPack = { id: withdrawId, isVerified: true };
    try {
      const { status, data } = await confirmWithdraw(withdrawPack);
      console.log(data);
      if (status === 200) {
        toast.success("Withdraw Confirmed");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  const handleRejectWithdraw = async (withdrawId) => {
    const withdrawPack = { id: withdrawId, isVerified: false };
    try {
      const { status, data } = await confirmWithdraw(withdrawPack);
      console.log(data);
      if (status === 200) {
        toast.success("Withdraw Rejected");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  const handleDeleteButton = async (withdrawId) => {
    const id = { withdrawId };
    try {
      const { status, data } = await deleteWithdraw(id);

      if (status === 200) {
        toast.success("Withdraw request deleted");
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
        <h3 className="alert alert-info text-center">Withdraws</h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col"> Email</th>
              <th scope="col"> Withdraw Amount </th>
              <th scope="col"> Wallet Address </th>
              <th scope="col">DateTime </th>

              <th scope="col"> Status </th>
              <th scope="col"> IsVerified</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(withdraws)
              ? withdraws.map((withdraw) => (
                  <tr>
                    <td>{!isEmpty(withdraw) ? withdraw.email : null} </td>
                    <td>
                      {!isEmpty(withdraw) ? withdraw.withdrawAmount : null}{" "}
                    </td>
                    <td>
                      {!isEmpty(withdraw) ? withdraw.walletAddress : null}{" "}
                    </td>
                    <td>
                      {`${calculateMinutesPassed(
                        withdraw.requestTime
                      )} Minutes ago`}
                    </td>
                    <td>
                      {!isEmpty(withdraw) ? (
                        // (withdraw.status && withdraw.isVerified ? (
                        //     <button
                        //       style={{ cursor: "default" }}
                        //       type="button"
                        //       class="btn btn-success"
                        //     >
                        //       successful
                        //     </button>
                        //   ) : null)

                        withdraw.status == true &&
                        withdraw.isVerified == false ? (
                          <button
                            style={{ cursor: "default" }}
                            type="button"
                            class="btn btn-danger"
                          >
                            rejected
                          </button>
                        ) : withdraw.status && withdraw.isVerified ? (
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
                            pending
                          </button>
                        )
                      ) : null}
                    </td>
                    <td>
                      {" "}
                      {withdraw.status == true ? (
                        <button
                          style={{ cursor: "default" }}
                          type="button"
                          class="btn btn-secondary"
                        >
                          Verified
                        </button>
                      ) : (
                        <div style={{ display: "flex" }}>
                          <button
                            key={withdraw.id}
                            onClick={(e) => handleVerifyWithdraw(withdraw.id)}
                            type="button"
                            class="btn btn-primary btn-sm mx-1"
                          >
                            Verify
                          </button>
                          <button
                            key={withdraw.id}
                            onClick={(e) => handleRejectWithdraw(withdraw.id)}
                            type="button"
                            class="btn btn-danger btn-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {" "}
                      <button
                        key={withdraw.id}
                        onClick={(e) => handleDeleteButton(withdraw.id)}
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
