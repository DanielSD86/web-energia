const styles = theme => ({
    buttonSearch: {
        margin: theme.spacing(1, 1, 0, 0),
        float: "right"
    },
    textSearch: {
        margin: theme.spacing(0),
    },
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

export default styles;