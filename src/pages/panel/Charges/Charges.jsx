import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import { GetUserById } from "../../../api/UserService";
import {
  GetAllBooks,
  GetBookByCategory,
  GetBookByName,
  GetBookByWriterName,
} from "../../../api/Books";
import { Button } from "bootstrap";
import { GetAllCharges } from "../../../api/ChargesService";

const Charges = () => {
  const [charges, setCharges] = useState();

  useEffect(async () => {
    await GetAllCharges().then((res) => {
      setCharges(res.data.result);
    });
  }, []);
  console.log(charges);
  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">کتاب ها</h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col"> ردیف</th>
              <th scope="col"> شماره کتاب</th>

              <th scope="col"> نام کتاب</th>

              <th scope="col"> شماره کاربر</th>
              <th scope="col"> نام کاربر</th>
              <th scope="col">تاریخ اصلی</th>
              <th scope="col">تاریخ برگشت</th>
              <th scope="col"> مبلغ جریمه</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(charges)
              ? charges.map((charge) => (
                  <tr>
                    <td>{!isEmpty(charge) ? charge.id : null} </td>
                    <td>{!isEmpty(charge) ? charge.bookId : null} </td>

                    <td>{!isEmpty(charge) ? charge.bookName : null} </td>

                    <td>{!isEmpty(charge) ? charge.userId : null} </td>
                    <td>{!isEmpty(charge) ? charge.userName : null} </td>
                    <td>
                      {!isEmpty(charge) ? charge.originalReturnDate : null}{" "}
                    </td>
                    <td>
                      {!isEmpty(charge) ? charge.penaltyReturnDate : null}{" "}
                    </td>
                    <td>{!isEmpty(charge) ? charge.charge : null} </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Charges;
