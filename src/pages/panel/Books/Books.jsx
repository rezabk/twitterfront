import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import { GetUserById } from "../../../api/UserService";
import { AddBook, DeleteBook, GetAllBooks } from "../../../api/Books";
import { toast } from "react-toastify";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import * as shamsi from "shamsi-date-converter";

import { ReserveBook } from "../../../api/ReserveBook";
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Books = () => {
  const [name, setName] = useState();
  const [writer, setWriter] = useState();
  const [shelveNumber, setShelveNumber] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [publishDate, setPublishDate] = useState(new Date());

  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [showDialog2, setShowDialog2] = useState(false);
  const open2 = () => setShowDialog2(true);
  const close2 = () => setShowDialog2(false);

  const [selectedDay, setSelectedDay] = useState(new Date());

  const [user, setUser] = useState();
  const [books, setBooks] = useState();
  const [bookId, setBookId] = useState();

  const userToken = localStorage.getItem("x-auth-token");
  const decodedToken = jwt_decode(userToken);

  useEffect(async () => {
    await GetAllBooks().then((res) => {
      setBooks(res.data.result);
    });
  }, []);
  useEffect(async () => {
    await GetUserById(decodedToken.unique_name).then((res) => {
      setUser(res.data.result);
    });
  }, []);

  const book = {
    name,
    writer,
    shelveNumber,
    category,
    quantity,
    publishDate,
  };

  const handleAddBook = async () => {
    await AddBook(book).then((res) => {
      toast.success("کتاب با موفقیت اضافه شد");
      setTimeout(() => {
        close2();
        window.location.reload();
      }, 1500);
    });
  };

  const handleDeleteBook = async () => {
    await DeleteBook(bookId).then((res) => {
      toast.success("کتاب با موفقیت حذف شد");
      window.location.reload();
    });
  };
  const reserve = {
    bookId: bookId,
    returnDate: selectedDay,
  };
  const handleReserveBook = async () => {
    try {
      await ReserveBook(reserve).then((res) => {
        toast.success("کتاب با موفقیت رزرو شد");
        setBookId(null);
        // window.location.reload();
        close();
      });
    } catch (error) {
      open();
    }
  };

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">کتاب ها</h3>
        {!isEmpty(user) && user.role === "admin" ? (
          <button className="btn btn-primary" onClick={open2}>
            <Dialog isOpen={showDialog2} onDismiss={close2}>
              <button className="close-button" onClick={close2}>
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
                    name="name"
                    style={{ marginBottom: 3 }}
                    className="form-control"
                    placeholder="  نام کتاب "
                    aria-describedby="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="text"
                    name="writer"
                    style={{ marginBottom: 3 }}
                    className="form-control"
                    placeholder="  نام نویسنده "
                    aria-describedby="writer"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                  />

                  <input
                    type="number"
                    name="shelveNumber"
                    style={{ marginBottom: 3 }}
                    className="form-control"
                    placeholder="  شماره قفسه  "
                    aria-describedby="shelveNumber"
                    value={shelveNumber}
                    onChange={(e) => setShelveNumber(e.target.value)}
                  />

                  <input
                    type="text"
                    name="category"
                    style={{ marginBottom: 3 }}
                    className="form-control"
                    placeholder="   دسته بندی "
                    aria-describedby="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />

                  <input
                    type="number"
                    name="quantity"
                    style={{ marginBottom: 3 }}
                    className="form-control"
                    placeholder="  تعداد   "
                    aria-describedby="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <div style={{ marginRight: "6%" }}>
                    <DatePicker
                      selected={publishDate}
                      onChange={(date: Date) => setPublishDate(date)}
                    />
                  </div>
                </form>
                <button
                  type="submit"
                  className="btn btn-success "
                  style={{ margin: "1em" }}
                  onClick={() => handleAddBook()}
                >
                  ثبت
                </button>
                <button
                  className="btn btn-warning mr-5"
                  style={{ margin: "1em" }}
                  onClick={close2}
                >
                  انصراف
                </button>
              </div>
            </Dialog>
            <span
              className="fa fa-plus"
              style={{
                verticalAlign: "middle",
                marginLeft: "1em",
                fontFamily: "Shabnam",
              }}
            ></span>
            اضافه کردن کتاب جدید
          </button>
        ) : null}

        <table class="table">
          <thead>
            <tr>
              <th scope="col">شمار کتاب</th>
              <th scope="col"> نام کتاب</th>

              <th scope="col">نام نویسنده</th>

              <th scope="col">شماره قفسه</th>
              <th scope="col">دسته بندی</th>
              <th scope="col">تعداد</th>
              <th scope="col">تاریخ انتشار</th>
              {!isEmpty(user) && user.role === "admin" ? (
                <>
                  <th scope="col">حذف</th>
                </>
              ) : (
                <>
                  <th scope="col">رزرو</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {!isEmpty(books)
              ? books.map((book) => (
                  <tr>
                    <td>{!isEmpty(book) ? book.id : null} </td>
                    <td>{!isEmpty(book) ? book.name : null} </td>

                    <td>{!isEmpty(book) ? book.writer : null} </td>

                    <td>{!isEmpty(book) ? book.shelveNumber : null} </td>
                    <td>{!isEmpty(book) ? book.category : null} </td>
                    <td>{!isEmpty(book) ? book.quantity : null} </td>
                    <td>{!isEmpty(book) ? book.publishDate : null} </td>

                    {!isEmpty(user) && user.role === "admin" ? (
                      <>
                        <td>
                          <button
                            class="btn btn-danger"
                            onClick={() => {
                              setBookId(book.id);
                              open();
                            }}
                          >
                            حذف
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
                              آیا از حذف این کتاب اطمینان دارید ؟{" "}
                            </p>
                            <button
                              class="btn btn-danger"
                              onClick={handleDeleteBook}
                            >
                              حذف
                            </button>
                            <button
                              class="btn btn-warning mx-5"
                              onClick={close}
                            >
                              انصراف
                            </button>
                          </Dialog>
                        </td>
                      </>
                    ) : (
                      <td>
                        <button class="btn btn-success" onClick={open}>
                          رزرو
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

                              <div style={{ marginRight: "6%" }}>
                                <DatePicker
                                  selected={selectedDay}
                                  onChange={(date: Date) =>
                                    setSelectedDay(date)
                                  }
                                />
                              </div>
                            </form>
                            <button
                              type="submit"
                              className="btn btn-success "
                              style={{ margin: "1em" }}
                              onClick={() => handleReserveBook()}
                            >
                              رزرو
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
                    )}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
