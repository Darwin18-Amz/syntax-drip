// src/components/Dashboard/Dashboard.js

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Input,
  DatePicker,
  Form,
  Typography,
  Modal,
  Space,
  Divider,
  Select,
  Checkbox,
  Radio,
} from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { auth, db } from '../../utils/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import {
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import { getDocument, GlobalWorkerOptions, version as pdfjsVersion } from 'pdfjs-dist';

// configure the PDF.js worker (only needed for the college-lookup PDF parse)
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function Dashboard() {
  // — State & Forms —
  const [allProfiles, setAllProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [viewVisible, setViewVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [viewForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [authForm] = Form.useForm();
  const navigate = useNavigate();

  // — Lookup Options —
  const projectTypeOptions = ['readymade', 'suggested', 'custom'];
  const knowUsOptions       = ['one', 'two', 'three'];
  const genderOptions       = ['male', 'female', 'others', 'rather not say'];

  // — Load lookups & profiles —
  useEffect(() => {
    (async () => {
      // 1) States lookup
      const statesRef = doc(db, 'lookups', 'states');
      const lkSnap     = await getDoc(statesRef);
      if (!lkSnap.exists()) {
        await setDoc(statesRef, {
          names: [
            "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
            "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
            "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
            "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
            "Uttar Pradesh","Uttarakhand","West Bengal"
          ]
        });
      }
      setStateOptions((await getDoc(statesRef)).data().names);

      // 2) Colleges lookup (parse AICTE PDF once)
      const collegesRef = doc(db, 'lookups', 'colleges');
      const clSnap      = await getDoc(collegesRef);
      setCollegeOptions(clSnap.data().names || []);
      if (!clSnap.exists()) {
        const pdf = await getDocument(
          'https://www.aicte-india.org/sites/default/files/Engineering.pdf'
        ).promise;
        let rawText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page    = await pdf.getPage(i);
          const content = await page.getTextContent();
          rawText += content.items.map(t => t.str).join(' ') + '\n';
        }
        const rx    = /([A-Z][A-Za-z &,\-0-9]+(?:Institute|College|University)[A-Za-z0-9 &,\-]*)/g;
        const names = Array.from(new Set(rawText.match(rx) || []));
        await setDoc(collegesRef, { names });
      }
      setCollegeOptions((await getDoc(collegesRef)).data().names);

      // 3) Load all profiles
      const snap = await getDocs(collection(db, 'profiles'));
      const arr  = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllProfiles(arr);
      setProfiles(arr);
    })();
  }, []);

  // — Search Filter —
  const onSearch = e => {
    const q = e.target.value.trim().toLowerCase();
    setProfiles(
      q
        ? allProfiles.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q)
          )
        : allProfiles
    );
  };

  // — Logout —
  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // — Open View Modal —
  const openViewModal = p => {
    setSelectedProfile(p);
    const rawDob = p.dob?.toDate ? p.dob.toDate() : p.dob;
    viewForm.setFieldsValue({
      ...p,
      dob: rawDob ? dayjs(rawDob) : null,
      useSame: p.whatsapp === p.phone,
      genderCustom: genderOptions.includes(p.gender) ? undefined : p.gender
    });
    setViewVisible(true);
  };

  // — Re-auth before edit —
  const onStartEdit = () => {
    authForm.resetFields();
    setAuthVisible(true);
  };
  const onAuthFinish = async ({ password }) => {
    try {
      const user = auth.currentUser;
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, cred);
      setAuthVisible(false);
      setViewVisible(false);
      openAddModal(selectedProfile);
    } catch (err) {
      Modal.error({ title: 'Auth Failed', content: err.message });
    }
  };

  // — Open Add/Edit Modal —
  const openAddModal = p => {
    if (p) {
      setSelectedProfile(p);
      const rawDob = p.dob?.toDate ? p.dob.toDate() : p.dob;
      addForm.setFieldsValue({
        ...p,
        dob: rawDob ? dayjs(rawDob) : null,
        useSame: p.whatsapp === p.phone,
        genderCustom: genderOptions.includes(p.gender) ? undefined : p.gender
      });
    } else {
      setSelectedProfile(null);
      addForm.resetFields();
    }
    setAddVisible(true);
  };

  // — Submit Add/Edit —
  const onAddFinish = async values => {
    const { useSame, dob, gender, genderCustom, ...rest } = values;
    const finalGender = gender === 'others' ? genderCustom : gender;
    const payload = {
      ...rest,
      dob: dob.toDate(),
      whatsapp: useSame ? values.phone : values.whatsapp,
      gender: finalGender,
      knowUs: values.knowUs || null
    };

    if (selectedProfile?.id) {
      await updateDoc(doc(db, 'profiles', selectedProfile.id), payload);
    } else {
      await addDoc(collection(db, 'profiles'), payload);
    }

    // reload profiles
    const snap = await getDocs(collection(db, 'profiles'));
    const arr  = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setAllProfiles(arr);
    setProfiles(arr);

    setAddVisible(false);
    setSelectedProfile(null);
    addForm.resetFields();
  };

  return (
    <Layout>
      {/* HEADER */}
      <Header className="dash-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3}>Syntax Drip</Title>
            <Input.Search
              placeholder="Search profiles..."
              onChange={onSearch}
              style={{ width: 300, marginTop: 8 }}
              allowClear
            />
          </Col>
          <Col>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => openAddModal(null)}
              />
              <Button
                danger
                icon={<LogoutOutlined />}
                size="large"
                onClick={logout}
              />
            </Space>
          </Col>
        </Row>
      </Header>

      {/* TILES */}
      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          {profiles.length === 0 ? (
            <Col span={24}>
              <Text type="secondary">No profiles yet.</Text>
            </Col>
          ) : (
            profiles.map(p => (
              <Col key={p.id} xs={24} sm={12} md={8}>
                <Card hoverable onDoubleClick={() => openViewModal(p)}>
                  <Title level={4}>{p.name}</Title>
                  <Text>{p.email}</Text>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Content>

      {/* VIEW MODAL */}
      <Modal
        title="Profile Details"
        open={viewVisible}
        onCancel={() => setViewVisible(false)}
        footer={[
          <Button key="edit" type="primary" onClick={onStartEdit}>
            Edit
          </Button>,
        ]}
        width={800}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <Form form={viewForm} layout="vertical">
          <Divider>Personal</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="name" label="Name">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email ID">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="Phone Number">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="useSame" valuePropName="checked">
                <Checkbox disabled>Same as WhatsApp</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="whatsapp" label="WhatsApp Number">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="dob" label="DOB">
                <DatePicker style={{ width: '100%' }} disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="gender" label="Gender">
                <Select disabled>
                  {genderOptions.map(g => (
                    <Option key={g}>{g}</Option>
                  ))}
                  {viewForm.getFieldValue('genderCustom') && (
                    <Option key="custom">
                      {viewForm.getFieldValue('genderCustom')}
                    </Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="collegeName" label="College Name">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="collegeLocation" label="College Location">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="department" label="Department">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="year" label="Year">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name="address" label="Address">
                <Input.TextArea readOnly rows={2} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="city" label="City">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="state" label="State">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="country" label="Country">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="knowUs" label="Know us from">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Projects</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="projectName" label="Project Name">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="projectType" label="Type">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="requirements" label="Requirements">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="customRequirements" label="Custom Requirements">
                <Input.TextArea readOnly rows={2} />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Presentation</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="presentation" label="Presentation">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="presentationFormat" label="Presentation Format">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="documentation" label="Documentation">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="documentationFormat"
                label="Documentation Format"
              >
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* AUTH MODAL */}
      <Modal
        title="Re-enter Password"
        open={authVisible}
        onCancel={() => setAuthVisible(false)}
        footer={null}
      >
        <Form form={authForm} layout="vertical" onFinish={onAuthFinish}>
          <Form.Item
            name="password"
            label="Current Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setAuthVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Verify
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* ADD / EDIT MODAL */}
      <Modal
        title={selectedProfile ? 'Edit Profile' : 'Add Profile'}
        open={addVisible}
        onCancel={() => {
          setAddVisible(false);
          setSelectedProfile(null);
        }}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={onAddFinish}
          initialValues={{
            presentation: 'no',
            presentationFormat: 'readymade',
            documentation: 'no',
            documentationFormat: 'readymade',
          }}
          onValuesChange={(changed, all) => {
            if (changed.useSame !== undefined) {
              addForm.setFieldsValue({
                whatsapp: changed.useSame ? all.phone : '',
              });
            }
            if (changed.phone !== undefined && all.useSame) {
              addForm.setFieldsValue({ whatsapp: changed.phone });
            }
          }}
        >

          {/* Personal Section */}
          <Divider>Personal</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="email"
                label="Email ID"
                rules={[{ type: 'email' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="useSame" valuePropName="checked">
                <Checkbox>Same as WhatsApp</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="whatsapp"
                label="WhatsApp Number"
                rules={[{ required: true }]}
              >
                <Input disabled={addForm.getFieldValue('useSame')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="dob"
                label="DOB"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Select gender' }]}
              >
                <Select
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, opt) =>
                    opt.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {genderOptions.map(g => (
                    <Option key={g}>{g}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prev, cur) => prev.gender !== cur.gender}
              >
                {({ getFieldValue }) =>
                  getFieldValue('gender') === 'others' ? (
                    <Form.Item
                      name="genderCustom"
                      label="Please specify"
                      rules={[
                        {
                          required: true,
                          message: 'Enter custom gender',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="collegeName"
                label="College Name"
                rules={[{ required: true }]}
              >
                <Select
                  mode="tags"
                  showSearch
                  placeholder="Type or select"
                  optionFilterProp="children"
                  filterOption={(input, opt) =>
                    opt.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {collegeOptions.map(c => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="collegeLocation" label="College Location">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="year" label="Year">
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name="address" label="Address">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="city" label="City">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="state" label="State">
                <Select
                  showSearch
                  placeholder="Select state"
                  optionFilterProp="children"
                  filterOption={(input, opt) =>
                    opt.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {stateOptions.map(s => (
                    <Option key={s}>{s}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="country" label="Country">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="knowUs" label="Know us from">
                <Select
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, opt) =>
                    opt.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {knowUsOptions.map(k => (
                    <Option key={k}>{k}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Projects Section */}
          <Divider>Projects</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="projectName"
                label="Project Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="projectType"
                label="Type"
                rules={[{ required: true, message: 'Select project type' }]}
              >
                <Select
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, opt) =>
                    opt.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {projectTypeOptions.map(t => (
                    <Option key={t}>{t}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="requirements" label="Requirements">
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Form.Item
              noStyle
              shouldUpdate={(prev, cur) =>
                prev.requirements !== cur.requirements
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('requirements') === 'yes' ? (
                  <Col span={24}>
                    <Form.Item name="customRequirements" label="Custom Requirements">
                      <Input.TextArea rows={2} />
                    </Form.Item>
                  </Col>
                ) : null
              }
            </Form.Item>
          </Row>

          {/* Presentation Section */}
          <Divider>Presentation</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="presentation" label="Presentation">
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="presentationFormat" label="Presentation Format">
                <Radio.Group>
                  <Radio value="readymade">ReadyMade</Radio>
                  <Radio value="custom">Custom</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="documentation" label="Documentation">
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="documentationFormat" label="Documentation Format">
                <Radio.Group>
                  <Radio value="readymade">ReadyMade</Radio>
                  <Radio value="custom">Custom</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Submit / Cancel */}
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setAddVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>

        </Form>
      </Modal>
    </Layout>
  );
}