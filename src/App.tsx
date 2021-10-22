import React, { useEffect } from "react";
import "./App.less";
import { Form, Input, Button, Row, Col } from "antd";
import { useAppDispatch } from "redux/hooks";
import { userLogin } from "redux/userSlice";
import { TUserLogin } from "models/user";

function App() {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(
  //     userLogin({
  //       email: "taivo2210@mailinator.com",
  //       password: "taivo2210@mailinator.com",
  //     })
  //   );
  // }, [dispatch]);

  const onFinish = (values: TUserLogin) => {
    dispatch(userLogin(values));
  };

  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100vh" }}>
      <Col xs={6}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default App;
