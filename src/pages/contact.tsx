import React from "react"
import Layout from "../components/Layout"
import { PageRendererProps, graphql } from "gatsby"
import SEO from "../components/seo"
import { Grid, Paper, TextField, Button } from "@material-ui/core"
import { ContactPageQuery } from "../graphqlTypes"
import { Formik } from "formik"
import styled from "styled-components"

const initialInputs = {
  name: "",
  email: "",
  context: "",
}

const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const MainPaper = styled(Paper)`
  padding: ${props => props.theme.spacing(2)}px;
`

const Form = styled.form`
  & > div {
    margin-top: ${props => props.theme.spacing(2)}px;
  }
`

interface ContactPageProps extends PageRendererProps {
  data: ContactPageQuery
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
              <h1>お問い合わせ</h1>
              <p>
                何かお問い合わせがあればこちらのコンタクトフォームからどうぞ。
              </p>
              <Formik
                initialValues={initialInputs}
                validate={values => {}}
                onSubmit={(values, { setSubmitting }) => {
                  fetch("/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encode({ "form-name": "contact", ...values }),
                  })
                    .then(() => alert("Success!"))
                    .catch(error => alert(error))

                  setSubmitting(false)
                }}
              >
                {({ handleSubmit, handleChange, values, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <TextField
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      label="お名前"
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
