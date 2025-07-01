import {useEffect, useState} from "react";
import {useParams} from "react-router";

const StatsDisplay: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const scrutinId = useParams<{ scrutinId: string }>().scrutinId;

    interface Stats {
        total: number;
        voted: number;
    }

    useEffect(() => {
        const loadStats = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/scrutins/${scrutinId}/members/stats`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const dataStats = await response.json();
                setStats(dataStats.data);
                console.log('Stats loaded:', dataStats);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        }
        loadStats();

    }, [scrutinId]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>A voté</th>
                    </tr>
                </thead>
                <tbody>
                    {stats && (
                        <tr>
                            <td>{stats.total}</td>
                            <td>{stats.voted}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StatsDisplay;