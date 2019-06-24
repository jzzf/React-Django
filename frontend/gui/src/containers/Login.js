import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Spin, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions/auth';
import './Login.css';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.username, values.password);
      }
    });
    this.props.history.push('/');
  };

  render() {

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
    // return (
    //   <div>
    //     <Row>
    //       <Col span={10}></Col>
    //       <Col span={4}>
    //         <div>
    //           {errorMessage}
    //           {
    //             this.props.loading ?

    //             <Spin indicator={antIcon} />

    //             :

    //             <Form onSubmit={this.handleSubmit} className="login-form">
    //               <Form.Item>
    //                 {getFieldDecorator('username', {
    //                   rules: [{ required: true, message: 'Please input your username!' }],
    //                 })(
    //                   <Input
    //                     prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
    //                     placeholder="Username"
    //                   />,
    //                 )}
    //               </Form.Item>

    //               <Form.Item>
    //                 {getFieldDecorator('password', {
    //                   rules: [{ required: true, message: 'Please input your Password!' }],
    //                 })(
    //                   <Input
    //                     prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
    //                     type="password"
    //                     placeholder="Password"
    //                   />,
    //                 )}
    //               </Form.Item>

    //               <Form.Item>
    //                 <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
    //                   Login
    //                 </Button>
    //                 Or
    //                 <NavLink style={{marginRight: '10px'}}
    //                 to="/signup"> Signup
    //                 </NavLink>
    //               </Form.Item>
    //             </Form>
    //           }
    //         </div>
    //       </Col>
    //       <Col span={10}></Col>
    //     </Row>
    //   </div>
    // );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);