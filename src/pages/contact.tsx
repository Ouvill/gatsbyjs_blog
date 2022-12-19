import React from "react"
import Layout from "../components/Layout"
import { PageRendererProps, graphql } from "gatsby"
import SEO from "../components/seo"
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core"
import { Formik } from "formik"
import styled from "styled-components"
import axios from "axios"

const initialInputs = {
  name: "",
  email: "",
  context: "",
  botField: "",
}

const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const MainPaper = styled(Paper)`
  max-width: 760px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing(2)}px;
`

const Form = styled.form`
  & > div {
    margin-top: ${(props) => props.theme.spacing(2)}px;
  }
`

interface ContactPageProps extends PageRendererProps {
  data: Queries.ContactPageQuery
}
const ContactPage: React.FC<ContactPageProps> = props => {
  const siteTitle = props.data!.site!.siteMetadata!.title || "no name"

  return (
    <>
      <Layout location={props.location} title={siteTitle}>
        <SEO title="Contact Form" />
        <Grid container direction="column">
          <Grid item xs={12} md={6} style={{ margin: "0 auto", width: "100%" }}>
            <MainPaper>
              <Typography variant="h4" component="h2">
                お問い合わせ
              </Typography>
              <Typography>
                何か「おーびる」に対して聞きたいこと、または、依頼があればこちらのコンタクトフォームで受け付けております。
              </Typography>
              <Typography>
                以下のようなお仕事の依頼も受け付けています。
                <ul>
                  <li>Webサイト制作</li>
                  <li>Web システム制作</li>
                  <li>モバイルアプリ制作</li>
                </ul>
              </Typography>
              <Typography>
                お仕事のほかにサイトの感想やコメントなども大歓迎です。
              </Typography>

              <Formik
                initialValues={initialInputs}
                validate={values => {}}
                onSubmit={(values, { setSubmitting, setValues }) => {
                  axios({
                    url: "/?no-cache=1",
                    method: "post",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: encode({ "form-name": "contact", ...values }),
                  })
                    .then(res => {
                      alert(
                        "お問い合わせありがとうございます。確認次第連絡致します。"
                      )
                      setValues(initialInputs)
                    })
                    .catch(error => {
                      if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                      } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request)
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message)
                      }
                      console.log(error.config)
                      alert("error")
                    })
                  setSubmitting(false)
                }}
              >
                {({ handleSubmit, handleChange, values, isSubmitting }) => (
                  <Form
                    onSubmit={handleSubmit}
                    name="contact"
                    data-netlify="true"
                    data-netlify-honeypot="botField"
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <p hidden>
                      <label>
                        Don’t fill this out:{" "}
                        <input
                          name="botField"
                          value={values.botField}
                          onChange={handleChange}
                        />
                      </label>
                    </p>

                    <TextField
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      label="お名前(ペンネーム可)"
                      fullWidth
                      variant="outlined"
                      required
                    ></TextField>

                    <TextField
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                      label="メールアドレス"
                      fullWidth
                      variant="outlined"
                      required
                    ></TextField>
                    <TextField
                      name="context"
                      value={values.context}
                      onChange={handleChange}
                      label="お問い合わせ内容"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows="5"
                      rowsMax="10"
                      required
                    ></TextField>

                    <Grid container justify="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        style={{ color: "white" }}
                      >
                        送信
                      </Button>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </MainPaper>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
