/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

import JoditEditor from 'jodit-react';

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",

  width: '100%',
  height: 300,
};

const PartnerPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [adesc, asetdesc] = useState('');
  const [amainImg, asetmainImg] = useState('');
  /* section1 */
  const [bsubtitle, bsetsubtitle] = useState('');
  const [btitle, bsettitle] = useState('');
  const [bdesc, bsetdesc] = useState('');
  /* section2 */
  const [csubtitle, csetsubtitle] = useState('');
  const [ctitle, csettitle] = useState('');
  const [cdata, csetdata] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');

  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetdesc(data.heroSection.desc);
    asetmainImg(data.heroSection.mainImg);
    bsetsubtitle(data.section1.subtitle);
    bsettitle(data.section1.title);
    bsetdesc(data.section1.desc);
    csetsubtitle(data.section2.subtitle);
    csettitle(data.section2.title);
    csetdata(data.section2.data);
    setMetaTitle(data?.metaTags?.metaTitle);
    setMetaDesc(data?.metaTags?.metaDesc);
    setMetaKeyword(data?.metaTags?.metakeyword);
  };

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}content?page=partner`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: HomePageContent.js:19 ~ fetchContent ~ data', data);
      setHomeContent(data.result.english.content);
      setStateData(data.result.english.content);
      setid(data.result._id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const changeContent = async (id, updatedData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}content/${id}`, updatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
      console.log('🤩 ~ file: HomePageContent.js:19 ~ fetchContent ~ data', data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return error.response.data;
    }
  };

  const handleSubmit = async () => {
    setaddLoader(true);
    const setFormData = {
      english: {
        pageTitle: 'PartnerPage',
        content: {
          heroSection: {
            title: atitle,
            desc: adesc,
            mainImg: amainImg,
          },
          section1: {
            subtitle: bsubtitle,
            title: btitle,
            desc: bdesc,
          },
          section2: {
            subtitle: csubtitle,
            title: ctitle,
            data: cdata,
          },
          metaTags: {
            metaTitle,
            metaDesc,
            metakeyword,
          },
        },
      },
    };
    console.log(setFormData);
    const updateResult = await changeContent(id, setFormData);
    setTimeout(() => {
      setaddLoader(false);
    }, 2500);
  };
  React.useEffect(() => {
    fetchContent();
  }, []);
  return (
    <div>
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 2, px: 3 }}>
                <h2>Hero Section</h2>
                <Grid item xs={12} md={12}>
                  <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      name="email"
                      label="Title"
                      value={atitle}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asettitle(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Sub Title"
                      value={adesc}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetdesc(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Main Image"
                      value={amainImg}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetmainImg(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Section 1</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Sub Title"
                        value={bsubtitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetsubtitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Title"
                        value={btitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsettitle(e.target.value);
                        }}
                      />
                      <h5>Description</h5>
                      {/* <TextField
                        name="title"
                        label="Sub Title"
                        value={bdesc}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetdesc(e.target.value);
                        }}
                      /> */}

                      <JoditEditor
                        value={bdesc}
                        config={editorConfig}
                        onChange={(value) => bsetdesc(value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Section 2</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Sub Title"
                        value={csubtitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          csetsubtitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Title"
                        value={ctitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          csettitle(e.target.value);
                        }}
                      />
                      <h3>Card Section</h3>
                      {cdata.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label={`Card Title ${index + 1}`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cdata];
                                dta[index].title = value;
                                csetdata(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label={`Image ${index + 1}`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cdata];
                                dta[index].img = value;
                                csetdata(dta);
                              }}
                            />
                          </>
                        );
                      })}
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Meta Data Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label={`Meta Title`}
                        style={{ width: '100%', marginTop: '24px' }}
                        value={metaTitle}
                        onChange={(e) => {
                          setMetaTitle(e.target.value);
                          // esetdata[index].title(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label={`Meta Description`}
                        style={{ width: '100%', marginTop: '24px' }}
                        value={metaDesc}
                        onChange={(e) => {
                          setMetaDesc(e.target.value);
                          // esetdata[index].subTitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label={`Meta Keyword`}
                        style={{ width: '100%', marginTop: '24px' }}
                        value={metakeyword}
                        onChange={(e) => {
                          setMetaKeyword(e.target.value);
                          // esetdata[index].subTitle(e.target.value);
                        }}
                      />
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'flex-end',
              opacity: 1,
            }}
          >
            {addRecordLoader ? (
              <div style={{ marginRight: '50px' }}>
                <CircularProgress />
              </div>
            ) : (
              <LoadingButton
                type="submit"
                variant="contained"
                style={{
                  background: '#FFC501',
                  padding: '10px 20px',
                  opacity: 1,
                }}
                onClick={() => handleSubmit()}
              >
                Edit Page Content
              </LoadingButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PartnerPageContent;
