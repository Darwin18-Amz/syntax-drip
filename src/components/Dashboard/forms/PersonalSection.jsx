import React from 'react';
import { Row, Col, Form, Input, Select, DatePicker} from 'antd';

const { Option } = Select;
const countryCodes = ["+91", "+1", "+44", "+61", "+81", "+49", "+33", "+86", "+7", "+973", /* add more */];


export default function PersonalSection({ form, stateOptions, collegeOptions, degreeOptions = [], departmentOptions }) {

  return (
    <Row gutter={16}>
      <Col span={8}>
          <Form.Item
             name="Name"
             label="Name"
             rules={[{ required: true }]}>
             <Input placeholder="Enter Name"/>
          </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name="Email ID"
          label="Email ID"
          rules={[{ required: true}]}
        >
          <Input placeholder="Enter Email ID"   />
        </Form.Item>
      </Col>

<Col span={8}>
  <Form.Item label="Phone Number" required style={{ marginBottom: 0 }}>
    <Input.Group compact>
      <Form.Item
        name="phoneCountryCode"
        noStyle
        initialValue="+91"
      >
        <Select
          style={{ width: '32%'}}
          dropdownMatchSelectWidth={false}
          showSearch
        >
          {countryCodes.map(code => (
            <Option key={code} value={code}>
              {code}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="Phone Number"
        noStyle
        rules={[
          { required: true},
          { pattern: /^\d{10}$/, message: 'Number must be exactly 10 digits' },
        ]}
      >
        <Input
          maxLength={10}
          placeholder="Enter Phone Number"
          style={{ width: '68%'}}
          inputMode="numeric"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            form.setFieldsValue({ "Phone Number": value });
          }}
          onKeyDown={(e) => {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            const pasted = e.clipboardData.getData('text');
            if (!/^\d+$/.test(pasted)) {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>
    </Input.Group>
  </Form.Item>
</Col>

    <Col span={8}>
      <Form.Item label="WhatsApp Number" required style={{ marginBottom: 0 }}>
        <Form.Item
          shouldUpdate={(prev, cur) => prev.useSame !== cur.useSame}
          noStyle
        >
          {({ getFieldValue }) => (
            <Input.Group compact>
              <Form.Item
                name="whatsappCountryCode"
                noStyle
                initialValue="+91"
              >
                <Select
                  style={{ width: '32%' }}
                  disabled={getFieldValue('useSame')}
                  dropdownMatchSelectWidth={false}
                  showSearch
                >
                  {countryCodes.map(code => (
                    <Option key={code} value={code}>
                      {code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="Whatsapp Number"
                noStyle
                rules={[
                  { required: true },
                  { pattern: /^\d{10}$/, message: 'Number must be exactly 10 digits' },
                ]}
              >
                <Input
                  maxLength={10}
                  placeholder="Enter WhatsApp No."
                  style={{ width: '68%'}}
                  disabled={getFieldValue('useSame')}
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    form.setFieldsValue({ "Whatsapp Number": value });
                  }}
                  onKeyDown={(e) => {
                    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData('text');
                    if (!/^\d+$/.test(pasted)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Input.Group>
          )}
        </Form.Item>
      </Form.Item>
    </Col>


      <Col span={8}>
        <Form.Item
          name="DOB"
          label="DOB"
          rules={[{ required: true }]}
        >
          <DatePicker
            style={{ width: '100%'}}
            format="DD/MM/YYYY"
            placeholder="Enter or Select Date"
          />
        </Form.Item>
      </Col>


     <Col span={8}>
       <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
         <Select
           mode="tags"
           maxTagCount={1}
           placeholder="Enter or Select Gender"
           dropdownMatchSelectWidth={false}
           tokenSeparators={[","]}
           optionFilterProp="value"
           filterOption={(input, option) =>
             option?.value?.toLowerCase().includes(input.toLowerCase())
           }
           onChange={(value) => {
             if (value.length > 1) {
               form.setFieldsValue({ Gender: [value[value.length - 1]] }); // ✅ Corrected to match Form.Item name
             }
           }}
           tagRender={({ label }) => (
             <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
               {label}
             </span>
           )}
         >
           {["Male", "Female", "Prefer Not To Say"].map((gender) => (
             <Option key={gender} value={gender}>
               {gender}
             </Option>
           ))}
         </Select>
       </Form.Item>
     </Col>

      <Col span={8}>
        <Form.Item name="College Name" label="College Name" rules={[{ required: true }]}>
          <Select
            mode="tags"
            maxTagCount={1}
            style={{ width: '100%'}}
            placeholder="Enter or Select Clg Name"
            dropdownMatchSelectWidth={false}
            tokenSeparators={[","]}
            optionFilterProp="value"
            showSearch
            filterOption={(input, option) =>
              option?.value?.toLowerCase().includes(input.toLowerCase())
            }
            value={form.getFieldValue('College Name') || []}
            onChange={(value) => {
              if (value.length > 1) {
                const last = value[value.length - 1];
                form.setFieldsValue({ 'College Name': [last] }); // ✅ Correct field key
              }
            }}
            tagRender={({ label }) => (
              <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
                {label}
              </span>
            )}
          >
            {collegeOptions.map((c) => (
              <Option key={c} value={c}>
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{c}</div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name="College Location"
          label="College Location"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter College Location" />
        </Form.Item>
      </Col>


      <Col span={8}>
      <Form.Item name="Education Level" label="Education Level" rules={[{ required: true }]}>
        <Select
          mode="tags"
          maxTagCount={1}
          style={{ width: '100%' }}
          placeholder="Enter or Select Edu Level"
          dropdownMatchSelectWidth={false}
          tokenSeparators={[","]}
          optionFilterProp="value"
          filterOption={(input, option) =>
            option?.value?.toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => {
            if (value.length > 1) {
              form.setFieldsValue({ "Education Level": [value[value.length - 1]] });
            }
          }}
          tagRender={({ label }) => (
            <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
              {label}
            </span>
          )}
        >
          {["Under Graduate", "Post Graduate", "Integrated Course"].map(level => (
            <Option key={level} value={level}>{level}</Option>
          ))}
        </Select>
      </Form.Item>

      </Col>

      <Col span={8}>
        <Form.Item name="Degree" label="Degree" rules={[{ required: true }]}>
          <Select
            mode="tags"
            maxTagCount={1}
            placeholder="Enter or Select Degree"
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            tokenSeparators={[',']}
            optionFilterProp="value"
            filterOption={(input, option) =>
              option?.value?.toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value) => {
              if (value.length > 1) {
                form.setFieldsValue({ Degree: [value[value.length - 1]] });
              }
            }}
            tagRender={({ label }) => (
              <span style={{ padding: '4px 8px', background: '#fff', borderRadius: 4 }}>
                {label}
              </span>
            )}
          >
            {degreeOptions.map((degree) => (
              <Option key={degree} value={degree}>
                {degree}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={8}>

            <Form.Item name="Course / Department" label="Course / Department" rules={[{ required: true }]}>
              <Select
                mode="tags"
                maxTagCount={1}
                style={{ width: '100%' }}
                placeholder="Enter or Select C / D"
                dropdownMatchSelectWidth={false}
                tokenSeparators={[","]}
                optionFilterProp="value"
                filterOption={(input, option) =>
                  option?.value?.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => {
                  if (value.length > 1) {
                    form.setFieldsValue({ "Course / Department": [value[value.length - 1]] });
                  }
                }}
                tagRender={({ label }) => (
                  <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
                    {label}
                  </span>
                )}
              >
                {departmentOptions.map((dept) => (
                  <Option key={dept} value={dept}>
                    {dept}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            </Col>

    <Col span={8}>
      <Form.Item name="Year" label="Year" rules={[{ required: true }]}>
        <Select
          mode="tags"
          maxTagCount={1}
          style={{ width: '100%' }}
          placeholder="Enter or Select Year"
          dropdownMatchSelectWidth={false}
          tokenSeparators={[","]}
          optionFilterProp="value"
          filterOption={(input, option) =>
            option?.value?.toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => {
            if (value.length > 1) {
              form.setFieldsValue({ Year: [value[value.length - 1]] });
            }
          }}
          tagRender={({ label }) => (
            <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
              {label}
            </span>
          )}
        >
          {["1", "2", "3", "4", "5"].map(year => (
            <Option key={year} value={year}>{year}</Option>
          ))}
        </Select>
      </Form.Item>


    </Col>


     <Col span={8}>
         <Form.Item name="Know Us From" label="Know us from" rules={[{ required: true }]}>
            <Select
              mode="tags"
              maxTagCount={1}
              style={{ width: '100%' }}
              placeholder="Enter or Select K Us F"
              dropdownMatchSelectWidth={false}
              tokenSeparators={[","]}
              optionFilterProp="value"
              filterOption={(input, option) =>
                option?.value?.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                if (value.length > 1) {
                  form.setFieldsValue({ "Know Us From": [value[value.length - 1]] });
                }
              }}
              tagRender={({ label }) => (
                <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
                  {label}
                </span>
              )}
            >
              {["Friend", "Social Media", "College", "Other"].map(source => (
                <Option key={source} value={source}>{source}</Option>
              ))}
            </Select>
          </Form.Item>
      </Col>

     <Col span={8}>
         <Form.Item name="City" label="City" rules={[{ required: true }]}>
           <Select
             mode="tags"
             maxTagCount={1}
             style={{ width: '100%' }}
             placeholder="Enter or Select City"
             dropdownMatchSelectWidth={false}
             tokenSeparators={[","]}
             optionFilterProp="value"
             filterOption={(input, option) =>
               option?.value?.toLowerCase().includes(input.toLowerCase())
             }
             onChange={(value) => {
               if (value.length > 1) {
                 form.setFieldsValue({ City: [value[value.length - 1]] });
               }
             }}
             tagRender={({ label }) => (
               <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
                 {label}
               </span>
             )}
           >
             {[
               "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur",
               "Vellore", "Erode", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur",
               "Nagercoil", "Kanchipuram", "Kumbakonam", "Cuddalore", "Hosur", "Ambur", "Pudukkottai",
               "Nagapattinam", "Udhagamandalam (Ooty)", "Ariyalur", "Perambalur", "Viluppuram", "Tenkasi",
               "Dharmapuri", "Krishnagiri"
             ].map(city => (
               <Option key={city} value={city}>{city}</Option>
             ))}
           </Select>
         </Form.Item>


      </Col>

      <Col span={8}>
         <Form.Item name="State" label="State" rules={[{ required: true }]}>
           <Select
             mode="tags"
             maxTagCount={1}
             style={{ width: '100%' }}
             placeholder="Enter or Select State"
             dropdownMatchSelectWidth={false}
             tokenSeparators={[","]}
             optionFilterProp="value"
             filterOption={(input, option) =>
               option?.value?.toLowerCase().includes(input.toLowerCase())
             }
             onChange={(value) => {
               if (value.length > 1) {
                 form.setFieldsValue({ State: [value[value.length - 1]] });
               }
             }}
             tagRender={({ label }) => (
               <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
                 {label}
               </span>
             )}
           >
             {[
               "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
               "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
               "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
               "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
               "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
               "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
               "Lakshadweep", "Puducherry"
             ].map(state => (
               <Option key={state} value={state}>{state}</Option>
             ))}
           </Select>
         </Form.Item>


    </Col>

    <Col span={8}>

      <Form.Item name="Country" label="Country" rules={[{ required: true }]}>
        <Select
          mode="tags"
          maxTagCount={1}
          style={{ width: '100%' }}
          placeholder="Enter or Select Country"
          dropdownMatchSelectWidth={false}
          tokenSeparators={[","]}
          optionFilterProp="value"
          filterOption={(input, option) =>
            option?.value?.toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => {
            if (value.length > 1) {
              form.setFieldsValue({ Country: [value[value.length - 1]] });
            }
          }}
          tagRender={({ label }) => (
            <span style={{ padding: '4px 8px', background: '#ffffff', borderRadius: 4 }}>
              {label}
            </span>
          )}
        >
          <Option value="Abkhazia">Abkhazia</Option>
          <Option value="Afghanistan">Afghanistan</Option>
          <Option value="Albania">Albania</Option>
          <Option value="Algeria">Algeria</Option>
          <Option value="Andorra">Andorra</Option>
          <Option value="Angola">Angola</Option>
          <Option value="Antigua and Barbuda">Antigua and Barbuda</Option>
          <Option value="Argentina">Argentina</Option>
          <Option value="Armenia">Armenia</Option>
          <Option value="Australia">Australia</Option>
          <Option value="Austria">Austria</Option>
          <Option value="Azerbaijan">Azerbaijan</Option>
          <Option value="Bahamas">Bahamas</Option>
          <Option value="Bahrain">Bahrain</Option>
          <Option value="Bangladesh">Bangladesh</Option>
          <Option value="Barbados">Barbados</Option>
          <Option value="Belarus">Belarus</Option>
          <Option value="Belgium">Belgium</Option>
          <Option value="Belize">Belize</Option>
          <Option value="Benin">Benin</Option>
          <Option value="Bhutan">Bhutan</Option>
          <Option value="Bolivia">Bolivia</Option>
          <Option value="Bosnia and Herzegovina">Bosnia and Herzegovina</Option>
          <Option value="Botswana">Botswana</Option>
          <Option value="Brazil">Brazil</Option>
          <Option value="Brunei">Brunei</Option>
          <Option value="Bulgaria">Bulgaria</Option>
          <Option value="Burkina Faso">Burkina Faso</Option>
          <Option value="Burundi">Burundi</Option>
          <Option value="Cabo Verde">Cabo Verde</Option>
          <Option value="Cambodia">Cambodia</Option>
          <Option value="Cameroon">Cameroon</Option>
          <Option value="Canada">Canada</Option>
          <Option value="Central African Republic">Central African Republic</Option>
          <Option value="Chad">Chad</Option>
          <Option value="Chile">Chile</Option>
          <Option value="China">China</Option>
          <Option value="Colombia">Colombia</Option>
          <Option value="Comoros">Comoros</Option>
          <Option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</Option>
          <Option value="Cook Islands">Cook Islands</Option>
          <Option value="Costa Rica">Costa Rica</Option>
          <Option value="Croatia">Croatia</Option>
          <Option value="Cuba">Cuba</Option>
          <Option value="Cyprus">Cyprus</Option>
          <Option value="Czech Republic">Czech Republic</Option>
          <Option value="Democratic Republic of the Congo">Democratic Republic of the Congo</Option>
          <Option value="Denmark">Denmark</Option>
          <Option value="Djibouti">Djibouti</Option>
          <Option value="Dominica">Dominica</Option>
          <Option value="Dominican Republic">Dominican Republic</Option>
          <Option value="Ecuador">Ecuador</Option>
          <Option value="Egypt">Egypt</Option>
          <Option value="El Salvador">El Salvador</Option>
          <Option value="Equatorial Guinea">Equatorial Guinea</Option>
          <Option value="Eritrea">Eritrea</Option>
          <Option value="Estonia">Estonia</Option>
          <Option value="Eswatini">Eswatini</Option>
          <Option value="Ethiopia">Ethiopia</Option>
          <Option value="Fiji">Fiji</Option>
          <Option value="Finland">Finland</Option>
          <Option value="France">France</Option>
          <Option value="Gabon">Gabon</Option>
          <Option value="Gambia">Gambia</Option>
          <Option value="Georgia">Georgia</Option>
          <Option value="Germany">Germany</Option>
          <Option value="Ghana">Ghana</Option>
          <Option value="Greece">Greece</Option>
          <Option value="Grenada">Grenada</Option>
          <Option value="Guatemala">Guatemala</Option>
          <Option value="Guinea">Guinea</Option>
          <Option value="Guinea-Bissau">Guinea-Bissau</Option>
          <Option value="Guyana">Guyana</Option>
          <Option value="Haiti">Haiti</Option>
          <Option value="Honduras">Honduras</Option>
          <Option value="Hungary">Hungary</Option>
          <Option value="Iceland">Iceland</Option>
          <Option value="India">India</Option>
          <Option value="Indonesia">Indonesia</Option>
          <Option value="Iran">Iran</Option>
          <Option value="Iraq">Iraq</Option>
          <Option value="Ireland">Ireland</Option>
          <Option value="Israel">Israel</Option>
          <Option value="Italy">Italy</Option>
          <Option value="Ivory Coast">Ivory Coast</Option>
          <Option value="Jamaica">Jamaica</Option>
          <Option value="Japan">Japan</Option>
          <Option value="Jordan">Jordan</Option>
          <Option value="Kazakhstan">Kazakhstan</Option>
          <Option value="Kenya">Kenya</Option>
          <Option value="Kiribati">Kiribati</Option>
          <Option value="Kosovo">Kosovo</Option>
          <Option value="Kuwait">Kuwait</Option>
          <Option value="Kyrgyzstan">Kyrgyzstan</Option>
          <Option value="Laos">Laos</Option>
          <Option value="Latvia">Latvia</Option>
          <Option value="Lebanon">Lebanon</Option>
          <Option value="Lesotho">Lesotho</Option>
          <Option value="Liberia">Liberia</Option>
          <Option value="Libya">Libya</Option>
          <Option value="Liechtenstein">Liechtenstein</Option>
          <Option value="Lithuania">Lithuania</Option>
          <Option value="Luxembourg">Luxembourg</Option>
          <Option value="Madagascar">Madagascar</Option>
          <Option value="Malawi">Malawi</Option>
          <Option value="Malaysia">Malaysia</Option>
          <Option value="Maldives">Maldives</Option>
          <Option value="Mali">Mali</Option>
          <Option value="Malta">Malta</Option>
          <Option value="Marshall Islands">Marshall Islands</Option>
          <Option value="Mauritania">Mauritania</Option>
          <Option value="Mauritius">Mauritius</Option>
          <Option value="Mexico">Mexico</Option>
          <Option value="Micronesia">Micronesia</Option>
          <Option value="Moldova">Moldova</Option>
          <Option value="Monaco">Monaco</Option>
          <Option value="Mongolia">Mongolia</Option>
          <Option value="Montenegro">Montenegro</Option>
          <Option value="Morocco">Morocco</Option>
          <Option value="Mozambique">Mozambique</Option>
          <Option value="Myanmar">Myanmar</Option>
          <Option value="Namibia">Namibia</Option>
          <Option value="Nauru">Nauru</Option>
          <Option value="Nepal">Nepal</Option>
          <Option value="Netherlands">Netherlands</Option>
          <Option value="New Zealand">New Zealand</Option>
          <Option value="Nicaragua">Nicaragua</Option>
          <Option value="Niger">Niger</Option>
          <Option value="Nigeria">Nigeria</Option>
          <Option value="Niue">Niue</Option>
          <Option value="North Korea">North Korea</Option>
          <Option value="North Macedonia">North Macedonia</Option>
          <Option value="Northern Cyprus">Northern Cyprus</Option>
          <Option value="Norway">Norway</Option>
          <Option value="Oman">Oman</Option>
          <Option value="Pakistan">Pakistan</Option>
          <Option value="Palau">Palau</Option>
          <Option value="Palestine">Palestine</Option>
          <Option value="Panama">Panama</Option>
          <Option value="Papua New Guinea">Papua New Guinea</Option>
          <Option value="Paraguay">Paraguay</Option>
          <Option value="Peru">Peru</Option>
          <Option value="Philippines">Philippines</Option>
          <Option value="Poland">Poland</Option>
          <Option value="Portugal">Portugal</Option>
          <Option value="Qatar">Qatar</Option>
          <Option value="Republic of the Congo">Republic of the Congo</Option>
          <Option value="Romania">Romania</Option>
          <Option value="Russia">Russia</Option>
          <Option value="Rwanda">Rwanda</Option>
          <Option value="Saint Kitts and Nevis">Saint Kitts and Nevis</Option>
          <Option value="Saint Lucia">Saint Lucia</Option>
          <Option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</Option>
          <Option value="Samoa">Samoa</Option>
          <Option value="San Marino">San Marino</Option>
          <Option value="Sao Tome and Principe">Sao Tome and Principe</Option>
          <Option value="Saudi Arabia">Saudi Arabia</Option>
          <Option value="Senegal">Senegal</Option>
          <Option value="Serbia">Serbia</Option>
          <Option value="Seychelles">Seychelles</Option>
          <Option value="Sierra Leone">Sierra Leone</Option>
          <Option value="Singapore">Singapore</Option>
          <Option value="Slovakia">Slovakia</Option>
          <Option value="Slovenia">Slovenia</Option>
          <Option value="Solomon Islands">Solomon Islands</Option>
          <Option value="Somalia">Somalia</Option>
          <Option value="Somaliland">Somaliland</Option>
          <Option value="South Africa">South Africa</Option>
          <Option value="South Korea">South Korea</Option>
          <Option value="South Ossetia">South Ossetia</Option>
          <Option value="South Sudan">South Sudan</Option>
          <Option value="Spain">Spain</Option>
          <Option value="Sri Lanka">Sri Lanka</Option>
          <Option value="Sudan">Sudan</Option>
          <Option value="Suriname">Suriname</Option>
          <Option value="Sweden">Sweden</Option>
          <Option value="Switzerland">Switzerland</Option>
          <Option value="Syria">Syria</Option>
          <Option value="Taiwan">Taiwan</Option>
          <Option value="Tajikistan">Tajikistan</Option>
          <Option value="Tanzania">Tanzania</Option>
          <Option value="Thailand">Thailand</Option>
          <Option value="Timor-Leste">Timor-Leste</Option>
          <Option value="Togo">Togo</Option>
          <Option value="Tonga">Tonga</Option>
          <Option value="Transnistria">Transnistria</Option>
          <Option value="Trinidad and Tobago">Trinidad and Tobago</Option>
          <Option value="Tunisia">Tunisia</Option>
          <Option value="Turkey">Turkey</Option>
          <Option value="Turkmenistan">Turkmenistan</Option>
          <Option value="Tuvalu">Tuvalu</Option>
          <Option value="Uganda">Uganda</Option>
          <Option value="Ukraine">Ukraine</Option>
          <Option value="United Arab Emirates">United Arab Emirates</Option>
          <Option value="United Kingdom">United Kingdom</Option>
          <Option value="United States">United States</Option>
          <Option value="Uruguay">Uruguay</Option>
          <Option value="Uzbekistan">Uzbekistan</Option>
          <Option value="Vanuatu">Vanuatu</Option>
          <Option value="Vatican City">Vatican City</Option>
          <Option value="Venezuela">Venezuela</Option>
          <Option value="Vietnam">Vietnam</Option>
          <Option value="Western Sahara">Western Sahara</Option>
          <Option value="Yemen">Yemen</Option>
          <Option value="Zambia">Zambia</Option>
          <Option value="Zimbabwe">Zimbabwe</Option>
        </Select>
      </Form.Item>
    </Col>

      <Col span={16}>
          <Form.Item name="Address" label="Address"
          rules = {[{required: true}]}>
              <Input.TextArea rows={2}
              placeholder="Enter Address"
              style={{ resize: 'none'}} />
          </Form.Item>
      </Col>

    </Row>
  );
}
