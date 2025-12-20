package utils

import (
    "database/sql"
    "time"
)

func ToStringPtr(ns sql.NullString) *string {
    if !ns.Valid {
        return nil
    }
    return &ns.String
}

func ToInt32Ptr(n sql.NullInt32) *int32 {
    if !n.Valid {
        return nil
    }
    return &n.Int32
}

func ToInt64Ptr(n sql.NullInt64) *int64 {
    if !n.Valid {
        return nil
    }
    return &n.Int64
}

func ToFloat64Ptr(n sql.NullFloat64) *float64 {
    if !n.Valid {
        return nil
    }
    return &n.Float64
}

func ToBoolPtr(nb sql.NullBool) *bool {
    if !nb.Valid {
        return nil
    }
    return &nb.Bool
}

func ToTimePtr(nt sql.NullTime) *string {
    if !nt.Valid {
        return nil
    }
    s := nt.Time.Format(time.RFC3339)
    return &s
}

