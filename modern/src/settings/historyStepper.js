import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));



export default function VerticalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //steps

  function getSteps() {
    const titles=props.data;
    var headers=[]
    if (props.source=="drivers"){

      for(var i=0;i<titles.length;i++){
        if(i%2==0)
        {
           headers.push("Affectation conducteur")
        }
        else
        {
            headers.push("Suppression d'affectation conducteur")
        }
     }
    }
    else{
    for(var i=0;i<titles.length;i++){
        if(i%2==0)
        {
           headers.push("Creation Numero Sequentiel")
        }
        else
        {
            headers.push("Supression Numero Sequentiel")
        }
    }
  }
         return headers
  }
  
  function getStepContent(step) {
     const steps=getSteps();
     for (var i=0;i<steps.length;i++){
         if(i==step && i%2==0){
             return props.data[i]
         }
         else if(i==step && i%2!=0){
            return props.data[i]
         }
     }
       
    /* switch (step) {
      case 0:
        return "maybe";
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step'; */
    
  }
  //end of steps

  return (
    <div className={classes.root}>
      <Stepper  activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step active = {true} key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <IconButton
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    <ArrowUpwardIcon />
                   
                  </IconButton>
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' :  <ArrowDownwardIcon /> }
                  </IconButton>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Button onClick={handleReset} className={classes.button}>
            Retourner
          </Button>
        </Paper>
      )}
    </div>
  );
}