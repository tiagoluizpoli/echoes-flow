# 0001: Volunteer Scheduling (Gerenciamento de Escalas)

## Overview
A system for ministry leaders to manage the scheduling (escalas) of volunteers who serve in their specific ministry. 

## Core Flow
1. **Team Onboarding**: The ministry leader sends a registration/invite link to potential or existing volunteers.
2. **Volunteer Registration**: Volunteers register themselves (or update their profile) through the provided link.
3. **Availability Specification**: Volunteers specify their availability (e.g., which Sundays, holidays, or specific dates they can serve).
4. **Schedule Creation**: The leader uses the availability data to build, manage, and finalize the ministry schedule (escala).

## Decisions Made
1. **Availability Granularity**: A mixture of both blockouts and specific shift availability. For days with multiple services (e.g., Sunday at 8am, 10am, and 6:30pm), volunteers can specify which exact services they can attend, or they can block out the entire day if they cannot serve at all.
2. **Roles/Positions**: Yes, ministries will have specific roles/positions. While some ministries only need one person (e.g., Projection), others like the Band or Kids Ministry require specific roles (e.g., specific age groups, special needs support). Volunteers need to be assigned to these specific positions.
3. **Notifications**: Required for the MVP. WhatsApp is the ideal channel for Brazil, but due to Meta's integration complexity, Push Notifications (via Web App/PWA) is a strong alternative to be considered. The exact method will be defined later, but the system must support notifying volunteers.
4. **Schedule Visibility**: For the MVP, volunteers will be able to see the full schedule for their ministry. We will start with a Role-Based Access Control (RBAC) system to manage permissions rather than complex attribute-based permissions.

