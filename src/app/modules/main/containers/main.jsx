import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
    Paper,
    Divider,
    RaisedButton,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    CircularProgress,
    Dialog,
} from 'material-ui';

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer
} from 'recharts';

import {
    assessmentResultSelector,
    currentQuestionSelector,
    sentencesSelector,
    isLoadingSelector,
    errorSelector
} from '../redux/selectors';

import {
    getSentencesAction,
    pickSentenceAction
} from '../redux/actions';

import Mobile from '../../../../components/reponsive/mobile';
import Desktop from '../../../../components/reponsive/desktop';

require('../../../../style/main.scss');
class MainContainer extends Component {
    render() {
        const {
            sentences,
            result,
            currentQuestion,
            isLoading,
            doPickSentence,
            doGetSentences,
            error,
        } = this.props;

        const {
            error: hasErrors,
            errorMessage
        } = error;
        
        return <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
                <Paper style={{ padding: '1.2em' }}>
                    <h2>Cultural Assessment</h2>
                    <p>
                        The goal of this assessment is to evaluate someone’s culture using a methodology developed by Charles O’Reilly at the Stanford GSB Institute for Organizational Behavior.
                    </p>
                    <p>
                        This methodology measures 6 dimensions to understand an individual’s culture norms:
                    </p>
                    <ul>
                        <li><b>Adaptability:</b> Readily takes advantage of new opportunities</li>
                        <li><b>Results-orientation:</b> Gets things done</li>
                        <li><b>Collaboration:</b> Is a great team player</li>
                        <li><b>Attention to detail:</b> Values precision and accuracy</li>
                        <li><b>Principles:</b> Holds high ethical standards</li>
                        <li><b>Customer-orientation:</b> Always keeps the customer in mind</li>
                    </ul>
                    <p>
                        Please answer honestly.
                    </p>
                    <Mobile>
                        {currentQuestion < 0 && <RaisedButton primary fullWidth={true} label={"Begin"} onClick={() => doGetSentences()} />}
                    </Mobile>
                    <Desktop>
                        {currentQuestion < 0 && <RaisedButton primary label={"Begin"} onClick={() => doGetSentences()} />}
                    </Desktop>
                </Paper>
                <br />
                <br />
                <div style={{ position: 'relative '}}>
                    {isLoading ? <CircularProgress style={{ 
                        position: 'absolute',
                        top: '50%',
                        right: '50%',
                        transform: 'translateX(-50%), translateY(-50%)'
                    }} /> : <Stepper activeStep={currentQuestion} orientation="vertical">
                        {map(sentences, ([a, b], k) => <Step key={k}>
                            <StepLabel>Question {k + 1}/{sentences.length}</StepLabel>
                            <StepContent>
                                <p>{a.sentence}</p>
                                <Mobile>
                                    <RaisedButton primary fullWidth={true} label={"Choose this"} onClick={() => doPickSentence(a)} />
                                </Mobile>
                                <Desktop>
                                    <RaisedButton primary label={"Choose this"} onClick={() => doPickSentence(a)} />
                                </Desktop>
                                <Divider />
                                <p>{b.sentence}</p>
                                <Mobile>
                                    <RaisedButton primary fullWidth={true} label={"Choose this"} onClick={() => doPickSentence(b)} />
                                </Mobile>
                                <Desktop>
                                    <RaisedButton primary label={"Choose this"} onClick={() => doPickSentence(b)} />
                                </Desktop>
                                <br />
                            </StepContent>
                        </Step>)}
                    </Stepper>}
                    <br />
                    <br />
                    {currentQuestion == sentences.length && <Paper style={{ padding: '1.2em' }}>
                        <h2>Your cultural traits</h2>
                        <ResponsiveContainer width="100%" height={500}>
                            <RadarChart outerRadius={90} width={700} height={250} data={result}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="dimension" />
                                <PolarRadiusAxis/>
                                <Radar name="Cultural traits" dataKey="value" stroke="#FFFFFF" fill={darkBaseTheme.palette.primary1color} fillOpacity={0.6}/>
                            </RadarChart>
                        </ResponsiveContainer>
                    </Paper>}
                </div>
                <Dialog
                    title="An error has ocurred"
                    modal={true}
                    open={hasErrors}
                >
                    {errorMessage}
                </Dialog>
            </div>
        </MuiThemeProvider>;
    }
}

const mapStateToProps = (state) => ({
    error: errorSelector(state),
    isLoading:  isLoadingSelector(state),
    sentences: sentencesSelector(state),
    result: assessmentResultSelector(state),
    currentQuestion: currentQuestionSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    doGetSentences: () => dispatch(getSentencesAction()),
    doPickSentence: (sentence) => dispatch(pickSentenceAction(sentence))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);