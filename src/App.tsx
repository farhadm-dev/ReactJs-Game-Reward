import React from 'react';
import { useState, useEffect, useReducer, FunctionComponent, PropsWithChildren } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import logo from './logo.svg';
import './App.css';
import { Label } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { time } from 'console';

interface MissionSectionProps {
    field?: string;
    containerSx?: any;
}
const MissionSection: FunctionComponent<PropsWithChildren<MissionSectionProps>> = (props) => {
    return (
        <Box
            sx={{
                m: 3,
                p: 1,
                backgroundColor: 'white',
                //'&:hover': {
                //    backgroundColor: 'grey',
                //    opacity: [0.9, 0.8, 0.7],
                //},
                borderRadius: 1,
                border: '1px solid purple',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
            {...props}>
            {props.field && <Typography sx={{
                display: 'flex-inline',
                alignSelf: 'center',
                backgroundColor: 'blueviolet',
                color: 'white',
                pl: 1, pr: 1,
                mt: -2.5, mb: 2,
                borderRadius: 1,
                width: '70%'
            }}>{props.field}</Typography>}

            <Box sx={props.containerSx}>
                {props.children}
            </Box>
        </Box>
    );
}

function CircularProgressWithLabel(props: CircularProgressProps & { value: number, label: string, visible?: boolean }) {
    return (
        <Box sx={{ position: 'relative', display: (typeof props.visible === 'undefined' || props.visible) ? 'inline-flex' : 'none' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{props.label}</Typography>
            </Box>
        </Box>);
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number, label: string, stx: any }) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', ...props.stx }}>
            <LinearProgress sx={{ width: '100%', height: 10, borderRadius: 1, ml:0, mr: 0 }} variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">{props.label}</Typography>
            </Box>
        </Box>
    );
}

function RateComponent() {
    const lablesDict: { [key: string]: string } = {
        1: "😢",
        2: "😔",
        3: "😊",
        4: "❤️",
        5: "😘"
    };
    const [rateVal, setRateVal] = useState<number | null>(4);
    const [hoverVal, setHoverVal] = useState<number>(-1);
    const [open, setOpen] = useState(false);

    return (
        <MissionSection field="Rate Us & Support Us" containerSx={{ '& > legend': { mt: 2 } }} >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 2 }}>
                <Rating size="large" precision={1} value={rateVal}
                    onChange={(e, newVal) => {
                        setRateVal(newVal);
                    }}
                    onChangeActive={(e, newVal) => { setHoverVal(newVal); }}
                    emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.55 }} />}
                />
                <Typography component="h5" variant="h5" sx={{ ml: 2 }} >{lablesDict[hoverVal == -1 ? rateVal! : hoverVal]}</Typography>
            </Box>
            <Button size="large" sx={{ width:'100%', pl: 5, pr: 5 }} variant="contained" endIcon={<TaskAltIcon />} onClick={(e) => {
                if (rateVal! < 3) {
                    // open a popup and get user feedback
                    setOpen(true);
                } else {

                }
            }}>
                Rate Us
            </Button>

            <Dialog open={open} onClose={(e) => setOpen(false)}>
                <DialogTitle>Feedback</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What's your problem about this game? share your thoughts and help us improve the game in upcoming updates.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="type your feedback..."
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => setOpen(false)}>Cancel</Button>
                    <Button onClick={(e) => setOpen(false)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </MissionSection>
    );
}

const WatchAdComponent: FunctionComponent = () => {
    interface TimerState {
        TotalSeconds: number;
        RemainedSeconds: number;
        TimerPercentage: number;
    }
    interface GameSettings {
        AdReward: number
    }
    //interface TimerAction {
    //    LastAdWatch: Date;
    //    ServerNow: Date;
    //}
    // just keep seconds to ad
    //const timerAction: TimerAction = { LastAdWatch: new Date(Date.now() - 1000 * 200), ServerNow: new Date() };

    //const [timerState, dispatchTimerState] = useReducer(({ TotalSeconds, RemainedSeconds, TimerPercentage }: TimerState, action: TimerAction): TimerState => {
    //    RemainedSeconds = action.ServerNow.getSeconds() - action.LastAdWatch.getSeconds();

    //    if (RemainedSeconds >= 0) {
    //        TimerPercentage = (TotalSeconds - RemainedSeconds) * 100 / TotalSeconds;
    //    }

    //    return { TotalSeconds: TotalSeconds, RemainedSeconds: RemainedSeconds, TimerPercentage: TimerPercentage };
    //}, { TotalSeconds: 90, RemainedSeconds: 90, TimerPercentage: 0 });

    //useEffect(() => {
    //    const timer = setInterval(() => {
    //        if (timerState.RemainedSeconds >= 0) {
    //            timerAction.ServerNow = new Date(timerAction.ServerNow.getSeconds() - 1);

    //            dispatchTimerState(timerAction);
    //        } else {
    //            clearInterval(timer);
    //        }
    //    }, 1000);
    //    return () => {
    //        clearInterval(timer);
    //    };
    //});

    const [timer, setTimer] = useState<TimerState>({ TotalSeconds: 90, RemainedSeconds: 90, TimerPercentage: 0 });
    const [gameSettings, setGameSettings] = useState<GameSettings>({ AdReward: 50 })

    useEffect(() => {
        const ticker = setInterval(() => {
            if (timer.RemainedSeconds > 0) {
                setTimer({
                    RemainedSeconds: timer.RemainedSeconds - 1,
                    TotalSeconds: timer.TotalSeconds,
                    TimerPercentage: (timer.TotalSeconds - (timer.RemainedSeconds - 1)) * 100 / timer.TotalSeconds
                });
            } else {
                clearInterval(ticker);
            }
        }, 1000);
        return () => {
            clearInterval(ticker);
        };
    });

    return (
        <MissionSection field={`Watch Rewarded Video & Earn ${gameSettings.AdReward}🪙`} containerSx={{ display: 'flex', flexDirection:'row', justifyContent: 'center' }}>
            {/*<CircularProgressWithLabel value={timer.TimerPercentage} Label={`${Math.round(timer.TimerPercentage)}%`} />*/}
            <CircularProgressWithLabel visible={timer.RemainedSeconds > 0} value={timer.TimerPercentage} label={`${(timer.TotalSeconds - timer.RemainedSeconds).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false
            })}s`} />

            <Button size="large" sx={{ width:'100%' }} variant="contained" endIcon={<PlayCircleOutlineIcon />} disabled={timer.RemainedSeconds > 0}>
                Watch Ad ( {`${gameSettings.AdReward}`}🪙 )
            </Button>
        </MissionSection>
    );
}

function GoToLevelComponent() {
    const [coins, setCoins] = useState<number>(0);
    const [level, setLevel] = useState<number>(1);
    const [missionLevel, setMissionLevel] = useState<number>(10);

    const progress = () => level * 100 / missionLevel;

    return (
        <MissionSection field={`Go To Level ${level} & Earn ${coins}🪙`} containerSx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <CircularProgressWithLabel value={progress()} label={`${progress()}%`} />

            <Button size="large" sx={{width:'100%'}} variant="contained" endIcon={<MonetizationOnIcon />} disabled={coins <= 0}>
                Claim {coins >= 0 && `( ${coins}🪙 )`}
            </Button>
        </MissionSection>
    );
}

function ReferGameComponent() {
    interface ReferSettings {
        TotalRefers: number,
        ReferReward: number,
    }
    interface PlayerRefers {
        ReferedCount: number,
        LastClaimed: boolean
    }

    const [referSettings, setReferSettings] = useState<ReferSettings>({ TotalRefers: 10, ReferReward: 50 });
    const [playerRefers, setPlayerRefers] = useState<PlayerRefers>({ ReferedCount: 3, LastClaimed: false });

    const [bdis, setBdis] = useState<boolean>(false);

    return (
        <MissionSection field="Refer a Friend & Earn Conis">
            <Stack direction='column' >
                {playerRefers.LastClaimed ? <Button variant="contained" disabled={bdis} onClick={()=> setBdis(!bdis)}>{`Refer a friend and get ${referSettings.ReferReward} 🪙 reward`}</Button> :
                    <Button size="large" disabled={bdis} onClick={() => setBdis(!bdis)} variant="contained" color="success">{`Claim your referal reward (${referSettings.ReferReward} 🪙)`}</Button>}
                <LinearProgressWithLabel stx={{mt: 0}} value={playerRefers.ReferedCount * 100 / referSettings.TotalRefers}
                    label={`${playerRefers.ReferedCount}/${referSettings.TotalRefers}`} />
            </Stack>
        </MissionSection>
    );
}

function GamesToInstallComponent() {
    interface Game {
        Id: number,
        Title: string,
        MissionReward: number,
        Installed: boolean // if so, its a claim button
    }

    const [games, setGames] = useState<Game[]>([
        { Id: 1, Title: "Game#1", MissionReward: 50, Installed: false },
        { Id: 1, Title: "Game#2", MissionReward: 75, Installed: true },
        { Id: 1, Title: "Game#3", MissionReward: 65, Installed: false },
    ]); // games that are neither installed nor claimed

    const installGame = (game: Game): void => {

    };
    const claimInstallation = (game: Game): void => {

    };

    return (
        <MissionSection field={`Install a Game & Earn Coins`} containerSx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'str' }}>
            {games?.map((game) => game.Installed ? <Button size="large" sx={{ display: 'flex', mb:1 }} variant="contained" onClick={() => claimInstallation(game)} >{`Claim ${game.MissionReward} 🪙`}</Button> :
                <Button size="large" sx={{ display: 'flex', mb:1 }} variant="contained" onClick={() => installGame(game)} >{`Install the game '${game.Title}' and earn ${game.MissionReward}`}</Button>)}
        </MissionSection>
    );
}

function App() {
    return (
        <div className="App">
            {/*<header className="App-header"></header>*/}
            <RateComponent />
            <WatchAdComponent />
            <GoToLevelComponent />
            <GamesToInstallComponent />
            <ReferGameComponent />
        </div>
    );
}

export default App;
