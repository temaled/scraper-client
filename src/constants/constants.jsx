const HOST_G = window.location.protocol+'//'+ window.location.hostname;

const APIConstants = {
    FB_USER_API_ROOT: HOST_G + ':3333',
    FB_GROUP_API_ROOT: HOST_G + ':3552',
    FB_KEYWORD_API_ROOT: HOST_G + ':3555',
    TWITTER_API_ROOT: HOST_G + ':3001',
    TELEGRAM_API_ROOT: HOST_G + ':3001',
    LINKEDIN_API_ROOT: HOST_G + ':3001',
    YOUTUBE_API_ROOT: HOST_G + ':3001',
    REQUESTS_API_ROOT: HOST_G + ':3001',
    COMMON_API_ROOT: HOST_G + ':3001',
    // REQUESTS_API_ROOT: HOST_G + ':5000',
    AUTHENTICATION_API_ROOT: HOST_G + ':3001',
    STATISTICS_API_ROOT: HOST_G + ':5601'
}

export default APIConstants;