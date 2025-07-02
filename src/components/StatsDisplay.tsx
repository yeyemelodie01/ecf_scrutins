import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";
import './style/StatsDisplay.css'
import {IonButton} from "@ionic/react";

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
            <h1>Statistique des votes</h1>
            <table className="stats-table">
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

            <BarChart
                width={500}
                height={300}
                data={
                    [
                        { name: 'Total', value: stats ? stats.total : 0 },
                        { name: 'À voté', value: stats ? stats.voted : 0 }
                    ]
                }
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <Bar dataKey="value" fill="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </BarChart>

            <div className="back-btn">
                <IonButton routerLink="/home">
                    Retour
                </IonButton>
            </div>
        </div>
    )
}

export default StatsDisplay;