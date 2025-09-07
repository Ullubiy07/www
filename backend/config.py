def getEnv(key):
    import os
    from dotenv import load_dotenv

    load_dotenv()
    return os.getenv(key)

