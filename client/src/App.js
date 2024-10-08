import UserList from "./components/UserList";
import UserProfileForm from "./components/UserProfileForm";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="root" style={{display: "flex", flexDirection: "row"}}>
      <UserProfileForm />
      <UserList />
      <UserDetails />
    </div>
  );
}

export default App;
