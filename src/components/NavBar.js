import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

export default function NavBar({ user }) {
  const history = useHistory();
  return (
    <nav>
      <div className="topnav">
        <Link to="/" className="active">
          Todo
        </Link>

        {user ? (
          <button
            className="btn"
            style={{
              height: "60px",
              width: "80px",
              float: "right",
          }}
            onClick={() => {
              auth.signOut();
              history.push("/login");
            }}
          >
            logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
