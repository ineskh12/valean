
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Personal Information",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <>
          <div style={{ marginLeft: '100px', width: '600px' }}>

            <TextField
              style={{ marginLeft: '40px' }}

              id="first-name"
              label="First Name"
              variant="outlined"
              placeholder="Enter Your First Name"
              fullWidth
              margin="normal"
              name="firstName"

            />
            <TextField
              style={{ marginLeft: '40px' }}

              id="last-name"
              label="Last Name"
              variant="outlined"
              placeholder="Enter Your Last Name"
              fullWidth
              margin="normal"
              name="lastName"
            />
            <TextField
              style={{ marginLeft: '40px', marginTop: '-2%' }}

              id="nick-name"
              label="Nick Name"
              variant="outlined"
              placeholder="Enter Your Nick Name"
              fullWidth
              margin="normal"
              name="nickName"
            />
          </div>
        </>
      );

    case 1:
      return (
        <>
          <div style={{ marginLeft: '100px', width: '600px' }}>
            <TextField
              style={{ marginLeft: '40px', marginTop: '-3%' }}
              id="email"
              label="E-mail"
              variant="outlined"
              placeholder="Enter Your E-mail Address"
              fullWidth
              margin="normal"
              name="emailAddress"
            />
            <TextField
              style={{ marginLeft: '40px' }}

              id="phone-number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth
              margin="normal"
              name="phoneNumber"
            />
            <TextField
              style={{ marginLeft: '40px' }}

              id="alternate-phone"
              label="Alternate Phone"
              variant="outlined"
              placeholder="Enter Your Alternate Phone"
              fullWidth
              margin="normal"
              name="alternatePhone"
            />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div style={{ marginLeft: '100px', width: '600px' }}>

            <TextField
              style={{ marginLeft: '40px' }}

              id="address1"
              label="Address 1"
              variant="outlined"
              placeholder="Enter Your Address 1"
              fullWidth
              margin="normal"
              name="address1"
            />
            <TextField
              style={{ marginLeft: '40px' }}

              id="address2"
              label="Address 2"
              variant="outlined"
              placeholder="Enter Your Address 2"
              fullWidth
              margin="normal"
              name="address2"
            />
            <TextField
              style={{ marginLeft: '40px' }}

              id="country"
              label="Country"
              variant="outlined"
              placeholder="Enter Your Country Name"
              fullWidth
              margin="normal"
              name="country"
            />
            </div>
        </>
          );
          case 3:
          return (
          <>

            <TextField
              style={{ marginLeft: '40px' }}

              id="cardNumber"
              label="Card Number"
              variant="outlined"
              placeholder="Enter Your Card Number"
              fullWidth
              margin="normal"
              name="cardNumber"
            />
            <TextField
              style={{ marginLeft: '40px' }}

              id="cardMonth"
              label="Card Month"
              variant="outlined"
              placeholder="Enter Your Card Month"
              fullWidth
              margin="normal"
              name="cardMonth"
            />
            <TextField
              style={{ marginLeft: '40px' }}

              id="cardYear"
              label="Card Year "
              variant="outlined"
              placeholder="Enter Your Card Year"
              fullWidth
              margin="100px"
              name="cardYear"
            />
          </>
          );
          default:
          return "unknown step";
  }
}

const LinaerStepper = () => {
  const classes = useStyles();
          const [activeStep, setActiveStep] = useState(0);
          const [skippedSteps, setSkippedSteps] = useState([]);
          const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
            setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
            setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
            setSkippedSteps([...skippedSteps, activeStep]);
    }
          setActiveStep(activeStep + 1);
  };

          return (
          <div style={{ width: '80%', textAlign: 'center' }}>
            <Stepper alternativeLabel activeStep={activeStep} style={{ width: '1000px' }}>
              {steps.map((step, index) => {
                const labelProps = {};
                const stepProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography
                      variant="caption"
                      align="center"
                      style={{ display: "block" }}
                    >
                      optional
                    </Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step {...stepProps} key={index}>
                    <StepLabel {...labelProps}>{step}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length ? (
          <>
          
          </>
            ) : (
              <>
                <form>{getStepContent(activeStep)}</form>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ textAlign: 'center', width: '50px' }}

                >

                  back
                </Button>
             
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  style={{ textAlign: 'center', width: '50px' }}
                >
                  {activeStep === steps.length - 1 ? "Valider" : "Next"}
                </Button>
              </>
            )}
          </div>
          );
};

          export default LinaerStepper;
