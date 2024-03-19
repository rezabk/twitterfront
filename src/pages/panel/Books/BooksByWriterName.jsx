import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import { GetUserById } from "../../../api/UserService";
import {
  GetAllBooks,
  GetBookByName,
  GetBookByWriterName,
} from "../../../api/Books";
import { Button } from "bootstrap";

const BooksByWriterName = () => {
  const [wiretName, setWriterName] = useState();
  const [books, setBooks] = useState();

  const handleBookByWriterName = async () => {
    await GetBookByWriterName(wiretName).then((res) => {
      setBooks(res.data.result);
    });
  };

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">کتاب ها</h3>
        <input
          type="text"
          className="form-control my-3"
          placeholder="جستجوی نام نویسنده"
          onChange={(e) => setWriterName(e.target.value)}
          style={{ width: "50%", float: "right", marginLeft: "2em" }}
        />
        <button
          type="button"
          class="btn btn-primary my-3"
          onClick={handleBookByWriterName}
        >
          {" "}
          ثبت
        </button>
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
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksByWriterName;
