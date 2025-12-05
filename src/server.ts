import config from "./config"
import app from "./types/app"

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})