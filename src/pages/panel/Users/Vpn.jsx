import React, { useState, useEffect } from "react";
import { addVpn, vpnCount } from "../../../api/AdminServices";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
export default function Vpn() {
  const [config, setConfig] = useState();
  const [vpnCountState, setVpnCountState] = useState();
  console.log(vpnCountState);
  const resetState = () => {
    setConfig("");
  };

  useEffect(() => {
    handleGetVpnCount();
  }, []);

  const handleAddVpn = async () => {
    const addConfig = { config };
    try {
      const { status, data } = await addVpn(addConfig);

      if (status === 200) {
        toast.success("Vpn Added");
        setVpnCountState(vpnCountState + 1);
        resetState();
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  const handleGetVpnCount = async () => {
    try {
      const { status, data } = await vpnCount();

      if (status === 200) {
        setVpnCountState(data.result);
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
        <h3 className="alert alert-info text-center">Add Vpn</h3>
        <form class="row g-3">
          <div class="col-auto">
            <label for="staticEmail2" class="visually-hidden">
              Vpn Config
            </label>
            <textarea
              type="text"
              class="form-control"
              id="Vpn"
              placeholder="Vpn Config"
              style={{ width: "500px", height: "30vh", textAlign: "left" }}
              value={config}
              onChange={(e) => setConfig(e.target.value)}
            />
          </div>

          <div class="col-auto">
            <button
              onClick={handleAddVpn}
              type="button"
              class="btn btn-primary mb-3"
            >
              Add Config
            </button>
          </div>
        </form>
        <div style={{ marginTop: "2%", fontSize: "25px" }}>
          {" "}
          Configs Count :{" "}
          <span style={{ marginLeft: "5%" }}>{vpnCountState}</span>
        </div>
      </div>
    </div>
  );
}
