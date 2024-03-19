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
// import { Button } from "bootstrap";
import { CheckBack, GetReservedBooks } from "../../../api/ReserveBook";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import { toast } from "react-toastify";

const ReservedBooks = () => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [bookId, setBookId] = useState();
  const [userId, setUserId] = useState();

  const [user, setUser] = useState();

  const userToken = localStorage.getItem("x-auth-token");
  const decodedToken = jwt_decode(userToken);

  useEffect(async () => {
    await GetUserById(decodedToken.unique_name).then((res) => {
      setUser(res.data.result);
    });
  }, []);

  const [reservedBooks, setReservedBooks] = useState();

  useEffect(async () => {
    const book = await GetReservedBooks().then((res) => {
      setReservedBooks(res.data.result);
      console.log(book);
    });
  }, []);

  const handleCheckBack = async () => {
    try {
      await CheckBack(userId, bookId).then((res) => {
        console.log(res);
        toast.success(res.data.messages[0]);
      });
      setTimeout(() => {
        close();
        window.location.reload();
      }, 1500);
    } catch (error) {}
  };

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">کتاب های رزرو شده</h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ردیف </th>
              <th scope="col">شمار کتاب</th>
              <th scope="col"> نام کتاب</th>
              <th scope="col">شماره کاربر </th>
              <th scope="col">نام کاربر </th>
              <th scope="col"> تاریخ برگشت</th>
              {!isEmpty(user) && user.role === "admin" ? (
                <th scope="col"> برگشت کتاب</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {!isEmpty(reservedBooks)
              ? reservedBooks.map((reservedBook) => (
                  <tr>
                    <td>{!isEmpty(reservedBook) ? reservedBook.id : null} </td>
                    <td>
                      {!isEmpty(reservedBook) ? reservedBook.bookId : null}{" "}
                    </td>
                    <td>
                      {!isEmpty(reservedBook) ? reservedBook.bookName : null}{" "}
                    </td>
                    <td>
                      {!isEmpty(reservedBook) ? reservedBook.userId : null}{" "}
                    </td>
                    <td>
                      {!isEmpty(reservedBook) ? reservedBook.userName : null}{" "}
                    </td>
                    <td>
                      {!isEmpty(reservedBook) ? reservedBook.returnDate : null}{" "}
                    </td>

                    {!isEmpty(user) ? (
                      user.role === "admin" ? (
                        <td>
                          <button className="btn btn-warning" onClick={open}>
                            برگشت
                          </button>

                          <Dialog isOpen={showDialog} onDismiss={close}>
                            <button className="close-button" onClick={close}>
                              <span aria-hidden>×</span>
                            </button>
                            <p
                              className="my-5"
                              style={{
                                fontFamily: "shabnam",
                                fontSize: "20px",
                              }}
                            >
                              لطفا اطلاعات مورد نیاز را وارد کنید
                            </p>

                            <div className="inner form-layer">
                              <form onSubmit={""}>
                                <input
                                  type="text"
                                  name="bookId"
                                  style={{ marginBottom: 3 }}
                                  className="form-control"
                                  placeholder="  شماره کتاب"
                                  aria-describedby="bookId"
                                  value={bookId}
                                  onChange={(e) => setBookId(e.target.value)}
                                />

                                <input
                                  type="text"
                                  name="userId"
                                  style={{ marginBottom: 3 }}
                                  className="form-control my-3"
                                  placeholder="  شماره کاربر"
                                  aria-describedby="userId"
                                  value={userId}
                                  onChange={(e) => setUserId(e.target.value)}
                                />
                              </form>
                              <button
                                type="submit"
                                className="btn btn-success "
                                style={{ margin: "1em" }}
                                onClick={() => handleCheckBack()}
                              >
                                برگشت
                              </button>
                              <button
                                className="btn btn-warning mr-5"
                                style={{ margin: "1em" }}
                                onClick={close}
                              >
                                انصراف
                              </button>
                            </div>
                          </Dialog>
                        </td>
                      ) : null
                    ) : null}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservedBooks;
