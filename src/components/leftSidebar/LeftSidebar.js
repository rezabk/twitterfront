import { ButtonBase, Divider, Grid, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect, useState, useRef } from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import {
  GetAllUsers,
  GetProfile,
  UploadUserImage,
} from "./../../api/UserService";

import { isEmpty } from "lodash";

export const Tweeter = ({ fullName, id, img }) => {
  const classes = useStyles();

  const getImage = () => {
    if (img) return img;
    else return "/images/user.png";
  };

  return (
    <ButtonBase>
      <Grid container direction={"row"} className={classes.tweeterParent}>
        <img
          src={getImage()}
          style={{ height: "45px", width: "45px", borderRadius: "50%" }}
        />
        <Grid
          container
          item
          direction={"column"}
          style={{ width: "max-content" }}
          className={classes.tweeterNameParent}
          alignItems={"flex-start"}
        >
          <Typography className={classes.profName}>{fullName}</Typography>
          <Typography className={classes.profId}>{id}</Typography>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};

const LeftSidebar = ({ data }) => {
  const classes = useStyles();

  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imagePath, setImagePath] = useState();
  const inputRef = useRef();

  useEffect(async () => {
    const { status, data } = await GetAllUsers();
    if (status == 200) {
      setUsers(data.result);
    } else return alert("ناموفق در دریافت کاربر");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleAvatarChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append("imageFile", e.target.files[0]);

      await UploadUserImage(formData).then((res) =>
        res.status == 201
          ? toast.success("عکس پروفایل تغییر کرد") &&
            window.setTimeout(function () {
              window.location.reload();
            }, 2000)
          : toast.error("مشکلی رخ داد")
      );
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction={"row-reverse"}>
        <img
          src={!isEmpty(data) ? data.imageSrc : null}
          style={{ height: "60px", width: "60px", borderRadius: "50%" }}
        />
        <Grid
          container
          item
          direction={"column"}
          style={{ width: "max-content" }}
          className={classes.profText}
        >
          <Typography className={classes.profName}>
            {!isEmpty(data) ? data.fullName : null}
          </Typography>
          <Typography className={classes.profId}>
            {!isEmpty(data) ? data.userName : null}
          </Typography>
          <Grid>
            <LogoutIcon onClick={handleLogout} style={{ cursor: "pointer" }} />
            <AddPhotoAlternateIcon
              onClick={() => {
                inputRef.current.click();
              }}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>
        <input
          ref={inputRef}
          type={"file"}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </Grid>
      <Grid item container direction={"column"} className={classes.tweeterRoot}>
        <Typography className={classes.tweeterTitle}>
          بهترین خبرنگاران
        </Typography>
        <Divider style={{ marginLeft: -24, marginRight: -24 }} />
        {users.map((item, index) => {
          return (
            <>
              <Link to={`/users/${item.userName}`}>
                <Tweeter
                  fullName={item.fullName}
                  id={item.userName}
                  img={item.imageSrc}
                />
                {index !== users.length - 1 && (
                  <Divider style={{ marginLeft: -24, marginRight: -24 }} />
                )}
              </Link>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default LeftSidebar;
