import React from "react";
import "./Style.css";

const Regex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
);
interface SignUpProps {
  name?: any;
  value?: any;
}
interface SignUpState {
  username: string;
  email: string;
  password: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
}

export class SignUp extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    const initialState = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const { errors } = this.state;

    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Username must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = Regex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 5 ? "Password must be 5 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState(
      { errors, [name]: value } as Pick<SignUpState, keyof SignUpState>,
      () => {
        console.log("Errors:", this.state.errors);
      }
    );
  }
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { username, email, password, errors } = this.state;
    console.log("Current state:", this.state);

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      alert("Please fill in all fields");
      return;
    }

    if (errors.username || errors.email || errors.password) {
      alert("Please correct the errors in the form");
      return;
    }

    console.log("Submitting form...");
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="fullName">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.username.length > 0 && (
                <span style={{ color: "red" }}>{errors.username}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.email.length > 0 && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
                        
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.password.length > 0 && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
            <div className="submit">
              <button>Register Me</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
