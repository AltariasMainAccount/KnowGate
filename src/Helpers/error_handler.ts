import express from "express";

export function errorHandler(err: Error, req: any, res: express.Response, next: any) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}