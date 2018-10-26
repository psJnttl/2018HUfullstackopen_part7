import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const Users = (props) => {
  const userList = props.users.map( (item) => {
    return <Table.Row key={item.id}>
      <Table.Cell>
        <Link to={'/users/' + item.id}>
          {item.name}
        </Link>
      </Table.Cell>
      <Table.Cell>{item.blogs.length}</Table.Cell>
    </Table.Row>
  });

  return (
    <div>
      <h3>users</h3>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>blogs added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList}
        </Table.Body>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};
const connectedUsers = connect(mapStateToProps)(Users);
export default connectedUsers;
