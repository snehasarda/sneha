import React ,{Component} from 'react';
import  { Card , Icon, Col,Modal,Form,Input} from 'antd';
import './Card.css'; 


class Cards extends Component {
  state ={
    visible:false,
    liked:"outlined"
  }
  changeColor=()=>{
    if (this.state.liked==="outlined")
     {this.setState({
      liked:"filled"});
     }else{
           this.setState({
           liked:"outlined"});
     }}
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.props.form.validateFields((err,values)=>{
     if(!err){
      console.log('Received values of form: ', values);
      this.props.cardUpdateHandler(this.props.index, values);
     }
   });
     this.setState({
      visible: false
    });
    
      
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  }

  render()
  { //const form=this.props.form;
    const { getFieldDecorator } = this.props.form;
    
    return(<Col  lg={8} xl={6} md={8} sm={12} xs={24} >
   <Card 
    style={{ width: 350 ,paddingBottom:10,paddingright:10,paddingleft:10,paddingtop:10}}
    cover={<img alt="example" src ={`https://avatars.dicebear.com/v2/avataaars/${this.props.username}.svg?options[mood][]=happy`} />}
    actions={[<Icon type="heart" theme={this.state.liked} onClick={this.changeColor} style={{color:"#FF0000"}}/>, <Icon type="edit" onClick={this.showModal} />, <Icon type="delete" theme="filled" onClick={this.props.clicked} />]}
  >
  <div>
  <h6>{this.props.name}</h6>
  <p style={{marginBottom:5}}>   <Icon style={{fontSize:20}} type="mail"/>  {this.props.email} </p>
  <p style={{marginBottom:5}}>   <Icon style={{fontSize:20}} type="phone"/> {this.props.phone} </p>
  <p style={{marginBottom:5}}>   <Icon style={{fontSize:20}} type="global"/>  {this.props.website} </p>

   </div>
   <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <Form >
        <Form.Item label="Name">{getFieldDecorator('name', {initialValue:this.props.name, 
            rules: [{ required: true, message: 'Please input your Name!', }]})(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="E-mail">{getFieldDecorator('email', {initialValue:this.props.email,
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(<Input/>
          )}
        </Form.Item>
        <Form.Item  label="Phone"
        >
          {getFieldDecorator('phone',{initialValue:this.props.phone,
            rules: [{ required: true, message: 'Please input your phone number!'}],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator('Website', {initialValue:this.props.website,
            rules: [{ required: true, message: 'Please input your website!' }],
          })(
            <Input  />
          )}
        </Form.Item>
      </Form>
    </Modal>
   
  </Card>
  </Col>
  );
  
      
}
}
export default Form.create()(Cards);