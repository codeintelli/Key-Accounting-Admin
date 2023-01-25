/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const FAQPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [adesc, asetdesc] = useState('');
  const [abtnTxt, asetbtnTxt] = useState('');
  const [abtnUrl, asetbtnUrl] = useState('');
  const [amainImg, asetmainImg] = useState('');
  /* section1 */
  const [bsubtitle, bsetsubtitle] = useState('');
  const [btitle, bsettitle] = useState('');
  const [bsidebarImg, bsetsidebarImg] = useState('');
  const [btexts, bsettexts] = useState('');


  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetdesc(data.heroSection.desc);
    asetbtnTxt(data.heroSection.btnTxt);
    asetbtnUrl(data.heroSection.btnUrl);
    asetmainImg(data.heroSection.mainImg);
    bsetsubtitle(data.section1.subtitle);
    bsettitle(data.section1.title);
    bsetsidebarImg(data.section1.sidebarImg);
    bsettexts(data.section1.texts);
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

      const { data } = await axios.get(`${BASE_URL}content?page=faq`, {
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
        pageTitle: 'ServicePage',
        content: {
          heroSection: {
            title: atitle,
            subTitle: adesc,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
            mainImg: amainImg,
          },
          section1: {
            subtitle: bsubtitle,
            title: btitle,
            desc: bdesc,
            mainImg: bmainImg,
          },
          section2: {
            desc: cdesc,
            img: cimg,
          },
          section3: {
            subtitle: dsubtitle,
            title: dtitle,
            data: dData,
          },
          section4: {
            subtitle: esubtitle,
            title: etitle,
            data: eData,
          },
          Faq: {
            subTitle: fsubtitle,
            title: ftitle,
            mainBtn: fmainBtn,
            texts: fData,
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
                      label="Desc"
                      value={adesc}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetdesc(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Txt"
                      value={abtnTxt}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetbtnTxt(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Url"
                      value={abtnUrl}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetbtnUrl(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="main Img"
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

          <div style={{marginTop:'50px'}}>
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
                    <TextField
                      name="title"
                      label="Title"
                      value={bsidebarImg}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        bsetsidebarImg(e.target.value);
                      }}
                    />
                    {btexts.map((cardData, index) => {
                      return (
                        <>
                          {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                          <TextField
                            name="email"
                            label="Title"
                            style={{ width: '100%', marginTop: '24px' }}
                            value={cardData.que}
                            onChange={(e) => {
                              const value = e.target.value;
                              const dta = [...bdata];
                              dta[index].que = value;
                              bsetdata(dta);
                            }}
                          />
                          <TextField
                            name="email"
                            label="Image"
                            style={{ width: '100%', marginTop: '24px' }}
                            value={cardData.ans}
                            onChange={(e) => {
                              const value = e.target.value;
                              const dta = [...bdata];
                              dta[index].ans = value;
                              bsetdata(dta);
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

export default FAQPageContent;
