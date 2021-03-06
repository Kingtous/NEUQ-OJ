/**
 * Created by out_xu on 17/3/28.
 */
import React, {Component} from 'react'
import './index.less'
import moment from 'moment'
import {Button, DatePicker, Form, Input, Modal, Radio, Select, Spin} from 'antd'
import {Link} from 'react-router'
import {goto, verify} from 'utils'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
import QueueAnim from 'rc-queue-anim'

const confirm = Modal.confirm

@Form.create()
class MachineEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.params
    console.log(this.props.params)
    id ? this.props.getServerInfo(id) : this.props.clearJudgeSever()
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, value) => {
      if (!err) {
        value.is_closed = value.is_closed === '1'
        confirm({
          title: '确认生成',
          content: '请认真审核信息!',
          onOk: async () => {
            this.props.params.id ? await this.props.updateJudgeServer(this.props.params.id, value) : await this.props.addJudgeServer(value)
          }
        })

      }
    })
  }

  render() {
    const {machines: {machineInfo}, form: {getFieldDecorator}, params: {id}} = this.props
    const formItemLayout = {}
    return (
      <div>
        <QueueAnim className='machine-edit' delay={100} type='bottom'>
          <div className='h-1' key='machine-edit-header'>{id ? `编辑机器###${id}` : '添加机器'}</div>
          <div className='machine-edit-content' key='machine-edit-content'>
            <Form onSubmit={this.handleSubmit} key={`machine-edit-content-${id}`}>
              <FormItem
                {...formItemLayout}
                label='机器名称'
              >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入机器名称'}],
                  initialValue: machineInfo.name ? machineInfo.name : ''
                })(
                  <Input placeholder='请输入机器名称' type='textarea' disabled={machineInfo.name} autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='rpc_token'
              >
                {getFieldDecorator('rpc_token', {
                  rules: [{required: true, message: '请输入机器rpc_token'}],
                  initialValue: ''
                })(
                  <Input placeholder='请输入rpc_token' type='textarea' autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='主机地址'
              >
                {getFieldDecorator('host', {
                  rules: [{required: true, message: '请输入主机地址'}],
                  initialValue: machineInfo.host ? machineInfo.host : ''
                })(
                  <Input placeholder='请输入主机地址' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label="主机端口"
              >
                {getFieldDecorator('port', {
                  rules: [{required: true, message: '请输入主机端口'}],
                  initialValue: machineInfo.port ? machineInfo.port : ''
                })(
                  <Input placeholder='请输入主机端口' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='启用状态'
              >
                {getFieldDecorator('status', {
                  rules: [{required: true, message: '请设置开启状态'}],
                  initialValue: machineInfo.status ? machineInfo.status : 0 // 这里由于initialValue
                })(
                  <RadioGroup>
                    <Radio value='0'>关闭</Radio>
                    <Radio value='1'>开启</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem>
                <Button type='primary' size='large' onClick={this.handleSubmit}>{id ? `编辑机器` : '添加机器'}</Button>
              </FormItem>
            </Form>
          </div>
        </QueueAnim>
      </div>
    )
  }
}

export default MachineEdit
