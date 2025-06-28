import React from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';

const { Option } = Select;

export default function ProjectSection() {
  const form = Form.useFormInstance(); // ✅ Correct way to access form instance

  return (
    <>
      <Row gutter={16}>
        {/* Project Name */}
        <Col span={24}>
          <Form.Item
            name="Project Name"
            label="Project Name"
            rules={[{ required: true}]}
          >
            <Input placeholder="Enter Project Name" />
          </Form.Item>
        </Col>

        {/* Project Type (Type or Select One) */}
        <Col span={8}>
          <Form.Item
            name="Project Name Given By"
            label="Project Name Given By"
            rules={[{ required: true }]}
          >
            <Select
              mode="tags"
              maxTagCount={1}
              placeholder="Enter or Select Project Name"
              style={{ width: '100%' }}
              dropdownMatchSelectWidth={false}
              tokenSeparators={[","]}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option?.value?.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                if (value.length > 1) {
                  form.setFieldsValue({ "Project Name Given By": [value[value.length - 1]] });
                }
              }}
              tagRender={({ label }) => (
                <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
                  {label}
                </span>
              )}
            >
              <Option value="Syntax Drip (ReadyMade)">Syntax Drip (ReadyMade)</Option>
              <Option value="Syntax Drip (Suggested)">Syntax Drip (Suggested)</Option>
              <Option value="Client (Suggested)">Client (Suggested)</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Project For (Type or Select One) */}
        <Col span={8}>
          <Form.Item
            name="Project For"
            label="Project For"
            rules={[{ required: true }]}
          >
            <Select
              mode="tags"
              maxTagCount={1}
              style={{ width: '100%' }}
              placeholder="Enter or Select Project For"
              dropdownMatchSelectWidth={false}
              tokenSeparators={[","]}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option?.value?.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                if (value.length > 1) {
                  form.setFieldsValue({ "Project For": [value[value.length - 1]] });
                }
              }}
              tagRender={({ label }) => (
                <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
                  {label}
                </span>
              )}
            >
              <Option value="College">College</Option>
              <Option value="Institution">Institution</Option>
              <Option value="Self">Self</Option>
            </Select>
          </Form.Item>
        </Col>


        {/* Client Requirements (Yes/No) */}
       <Col span={8}>
         {/* Radio selection for Client Requirements with required validation */}
         <Form.Item
           name="Client Requirements"
           label="Client Requirements"
           rules={[{ required: true }]}
         >
           <Radio.Group>
             <Radio value="yes">Yes</Radio>
             <Radio value="no">No</Radio>
           </Radio.Group>
         </Form.Item>
       </Col>

       {/* Conditionally show textarea only when "yes" is selected */}
       <Form.Item noStyle shouldUpdate>
         {({ getFieldValue }) =>
           getFieldValue('Client Requirements') === 'yes' ? (
             <Col span={24}>
               <Form.Item
                 name="Client Requirements Description"
                 label="Client Requirements"
                 rules={[{ required: true }]}
               >
                 <Input.TextArea
                   rows={4}
                   placeholder="Describe Client Requirements..."
                   style={{ resize: 'none' }}
                 />
               </Form.Item>
             </Col>
           ) : null
         }
       </Form.Item>


      </Row>
    </>
  );
}
