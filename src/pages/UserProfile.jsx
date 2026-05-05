function UserProfile() {
  const users = [
    {
      name: 'Raja',
      role: 'Manager',
      email: '[email protected]',
      phone: '+62 811-1111-1111',
      location: 'Bandung, Indonesia',
    },
    {
      name: 'Farhan',
      role: 'Supervisor',
      email: '[email protected]',
      phone: '+62 813-2222-2222',
      location: 'Surabaya, Indonesia',
    },
    {
      name: 'Hafiz',
      role: 'Staff',
      email: '[email protected]',
      phone: '+62 815-3333-3333',
      location: 'Yogyakarta, Indonesia',
    },
  ]

  return (
    <section className="profile-grid">
      {users.map((user) => (
        <article key={user.name} className="panel profile-card">
          <h3>{user.name}</h3>
          <p>{user.role}</p>
          <div className="profile-meta">
            <div>
              <small>Email</small>
              <strong>{user.email}</strong>
            </div>
            <div>
              <small>Phone</small>
              <strong>{user.phone}</strong>
            </div>
            <div>
              <small>Location</small>
              <strong>{user.location}</strong>
            </div>
          </div>
          <button type="button">Edit Profile</button>
        </article>
      ))}
    </section>
  )
}

export default UserProfile
