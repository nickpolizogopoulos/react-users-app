import UserForm from "./components/UserForm";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

const App = () => {
  const { users, error, isLoading, setUsers, setError } = useUsers();

const deleteUser = ( user:User ) => {
  const originalUsers = [...users];
  setUsers(users.filter(u => u.id !== user.id ));
  
  userService.delete(user.id as number)
    .catch(error => {
      setError(error.message)
      setUsers(originalUsers)
    })
}

const addUser = (newUser:User) => {
  const originalUsers = [...users];
  setUsers( [ {...newUser, id: users.length + 1 }, ...users ] )
    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch(error => {
        setError(error.message)
        setUsers(originalUsers)
      })
}

  return (
  <>
    <div className="mb-5">
    <UserForm onSubmit={addUser} />
    </div>

    {error && <p className="text-danger">{error}</p>}
    {isLoading && <div className="spinner-border"></div>}
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-outline-danger rounded-0"
                onClick={() => deleteUser(user)}>Delete
              </button>
            </td> 
          </tr>
        ))}
      </tbody>
    </table>
  </>);
};

export default App;