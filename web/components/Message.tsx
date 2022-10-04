import {Alert, AlertTitle, Box, Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Message({ message, show, close, severity }) {
    return (
        <Box sx={{ width: '50%' }} style={{marginTop: '3vh', alignContent: 'center'}}>
            <Collapse in={show}>
                <Alert severity={severity} style={{ alignItems: 'center' }} action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="large"
                        onClick={() => close()}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                    <AlertTitle style={{ fontSize: '2.5vh', margin: 0 }}>{ message }</AlertTitle>
                </Alert>
            </Collapse>
        </Box>
    )
}